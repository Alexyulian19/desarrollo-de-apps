# Cámara AR · Ionic + Angular + MediaPipe

Aplicación de realidad aumentada que abre la cámara, detecta las manos en tiempo real con
MediaPipe Hands y dibuja un círculo rojo sobre la punta del dedo índice.

## Funciones
- Detección de hasta 2 manos (21 landmarks por mano).
- Círculo rojo sobre la punta del índice (landmark 8).
- Gesto de pellizco: si el pulgar (4) toca el índice (8), el círculo se vuelve verde.
- Esqueleto de la mano opcional (drawConnectors y drawLandmarks).
- Cambio entre cámara frontal (con efecto espejo) y trasera.
- Pantalla de carga y mensajes de error claros (permiso rechazado, sin cámara, sin HTTPS).
- Libera la cámara y el modelo al salir (ngOnDestroy).

## Requisitos
- Node.js 18 o superior
- Ionic CLI: `npm i -g @ionic/cli`
- Conexión a internet (MediaPipe se carga desde jsDelivr)

## Ejecutar en el navegador
```bash
npm install
ionic serve
```
Abre http://localhost:8100 y acepta el permiso de la cámara.

## Probar en el celular
Los navegadores solo permiten la cámara en HTTPS o localhost.

Opción A, HTTPS local:
```bash
ionic serve --external --ssl
```

Opción B, app nativa Android con Capacitor:
```bash
ionic build
npx cap add android
npx cap sync
npx cap open android
```
Luego en `android/app/src/main/AndroidManifest.xml` agrega:
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## Estructura
```
camara_ar/
 ├─ capacitor.config.ts
 ├─ docs/Proyecto_Camara_AR.pdf      (documento del proyecto)
 └─ src/
    ├─ index.html                    (carga MediaPipe)
    ├─ global.scss
    ├─ theme/variables.scss          (paleta)
    └─ app/
       ├─ app.component.*            (componente raíz)
       ├─ app.routes.ts              (rutas)
       └─ home/
          ├─ home.page.html          (video + canvas + controles)
          ├─ home.page.scss          (estilos)
          └─ home.page.ts            (lógica de IA y dibujo)
```
