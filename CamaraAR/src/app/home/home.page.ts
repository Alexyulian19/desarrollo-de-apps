import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraReverseOutline, gitNetworkOutline } from 'ionicons/icons';

// Clases globales que crean los scripts de MediaPipe cargados en index.html
declare const Hands: any;
declare const Camera: any;
declare const drawConnectors: any;
declare const drawLandmarks: any;
declare const HAND_CONNECTIONS: any;

type Estado = 'cargando' | 'listo' | 'error';
type Lente = 'user' | 'environment';

// Índices de los landmarks usados
const PUNTA_PULGAR = 4;
const PUNTA_INDICE = 8;
// Distancia normalizada (0 a 1) por debajo de la cual se considera "pellizco"
const UMBRAL_PELLIZCO = 0.05;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonSpinner],
})
export class HomePage implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  // Estado de la interfaz
  estado: Estado = 'cargando';
  mensajeCarga = 'Cargando modelo de IA';
  mensajeError = '';
  manos = 0;
  pellizco = false;
  mostrarEsqueleto = false;
  facingMode: Lente = 'user';
  cambiando = false;

  private hands: any;
  private camera: any;

  constructor(private zone: NgZone) {
    addIcons({ cameraReverseOutline, gitNetworkOutline });
  }

  get textoEstado(): string {
    if (this.manos === 0) return 'Muestra tu mano';
    if (this.pellizco) return 'Pellizco';
    return this.manos === 1 ? '1 mano' : `${this.manos} manos`;
  }

  // ---------- 1. Punto de partida: el HTML ya existe ----------
  async ngAfterViewInit(): Promise<void> {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d')!;

    if (typeof Hands === 'undefined' || typeof Camera === 'undefined') {
      this.mostrarError('No se cargaron las librerías de MediaPipe. Revisa tu conexión a internet.');
      return;
    }

    // ---------- 2. Crear y configurar el detector de manos ----------
    this.hands = new Hands({
      locateFile: (f: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${f}`,
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    // ---------- 3. Qué hacer con cada resultado ----------
    this.hands.onResults((r: any) => {
      // Igualar la resolución del canvas con la del video (solo si cambia)
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Pintar el frame de la cámara
      ctx.drawImage(r.image, 0, 0, canvas.width, canvas.height);

      const listaManos: any[] = r.multiHandLandmarks ?? [];
      let hayPellizco = false;

      listaManos.forEach((mano: any) => {
        // Esqueleto opcional (drawing_utils de MediaPipe)
        if (this.mostrarEsqueleto && typeof drawConnectors !== 'undefined') {
          drawConnectors(ctx, mano, HAND_CONNECTIONS, { color: 'rgba(255,255,255,0.75)', lineWidth: 3 });
          drawLandmarks(ctx, mano, { color: 'rgba(255,255,255,0.95)', fillColor: '#000', lineWidth: 2, radius: 4 });
        }

        // Detección de gesto: pellizco = pulgar (4) cerca del índice (8)
        const pulgar = mano[PUNTA_PULGAR];
        const punta = mano[PUNTA_INDICE];
        const distancia = Math.hypot(pulgar.x - punta.x, pulgar.y - punta.y);
        const esPellizco = distancia < UMBRAL_PELLIZCO;
        if (esPellizco) hayPellizco = true;

        // Círculo sobre la punta del índice (efecto AR)
        ctx.beginPath();
        ctx.arc(punta.x * canvas.width, punta.y * canvas.height, esPellizco ? 18 : 30, 0, 2 * Math.PI);
        ctx.fillStyle = esPellizco ? 'rgba(52, 199, 89, 0.85)' : 'rgba(255, 0, 0, 0.8)';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.stroke();
      });

      // Actualizar la interfaz solo cuando algo cambia (evita redibujar Angular 30 veces por segundo)
      if (listaManos.length !== this.manos || hayPellizco !== this.pellizco) {
        this.zone.run(() => {
          this.manos = listaManos.length;
          this.pellizco = hayPellizco;
        });
      }
    });

    // ---------- 4. Cargar el modelo y encender la cámara ----------
    try {
      await this.hands.initialize();
      await this.iniciarCamara();
    } catch (e) {
      this.mostrarError(this.describirError(e));
    }
  }

  private async iniciarCamara(): Promise<void> {
    this.mensajeCarga = 'Abriendo la cámara';
    const video = this.videoElement.nativeElement;

    this.camera = new Camera(video, {
      onFrame: async () => await this.hands.send({ image: video }),
      width: 1080,
      height: 1080,
      facingMode: this.facingMode,
    });

    // El bucle de frames corre fuera de Angular para no gastar recursos
    await this.zone.runOutsideAngular(() => this.camera.start());
    this.zone.run(() => (this.estado = 'listo'));
  }

  // ---------- Controles ----------
  alternarEsqueleto(): void {
    this.mostrarEsqueleto = !this.mostrarEsqueleto;
  }

  async cambiarCamara(): Promise<void> {
    if (this.cambiando) return;
    this.cambiando = true;
    try {
      await this.camera?.stop();
      this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
      await this.iniciarCamara();
    } catch (e) {
      this.mostrarError(this.describirError(e));
    } finally {
      this.cambiando = false;
    }
  }

  async reintentar(): Promise<void> {
    this.estado = 'cargando';
    this.mensajeCarga = 'Abriendo la cámara';
    try {
      await this.camera?.stop();
      if (!this.hands) {
        await this.ngAfterViewInit();
        return;
      }
      await this.iniciarCamara();
    } catch (e) {
      this.mostrarError(this.describirError(e));
    }
  }

  private mostrarError(mensaje: string): void {
    this.zone.run(() => {
      this.estado = 'error';
      this.mensajeError = mensaje;
    });
  }

  private describirError(e: any): string {
    const nombre = e?.name ?? '';
    if (nombre === 'NotAllowedError') return 'El permiso de la cámara fue rechazado. Habilítalo en la configuración del navegador.';
    if (nombre === 'NotFoundError') return 'No se encontró ninguna cámara en este dispositivo.';
    if (nombre === 'NotReadableError') return 'Otra aplicación está usando la cámara. Ciérrala e intenta de nuevo.';
    if (!window.isSecureContext) return 'La cámara solo funciona en HTTPS o en localhost.';
    return 'Ocurrió un error al iniciar la cámara o el modelo.';
  }

  // ---------- 5. Limpiar recursos al salir ----------
  ngOnDestroy(): void {
    this.camera?.stop();
    this.hands?.close();
  }
}
