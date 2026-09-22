import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonNav,
  IonNavLink,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

// NIVEL 3: Componente Final de la Pila
@Component({
  selector: 'app-nav-level-three',
  template: `
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Nivel 3 (Profundo)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Límite de la Pila</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Has llegado al nivel más profundo de la pila de navegación.</p>
          <ion-button expand="block" color="danger" class="ion-margin-top" (click)="regresarAlInicio()">
            Volver al Inicio (Pop to Root)
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class NavLevelThreeComponent {
  regresarAlInicio() {
    const nav = document.querySelector('ion-nav');
    if (nav) {
      nav.popToRoot();
    }
  }
}

// NIVEL 2: Componente Detalle con Recepción de Parámetros
@Component({
  selector: 'app-nav-detail',
  template: `
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Nivel 2: Detalle</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Datos Recibidos via Props</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Usuario:</strong> {{ nombreUsuario || 'Sin datos' }}</p>
          <p><strong>ID de Sesión:</strong> {{ idSesion || 0 }}</p>

          <ion-nav-link [component]="nivelTres">
            <ion-button expand="block" color="warning" class="ion-margin-top">
              Avanzar al Nivel 3
            </ion-button>
          </ion-nav-link>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonNavLink
  ]
})
export class NavDetailComponent {
  @Input() nombreUsuario?: string;
  @Input() idSesion?: number;

  nivelTres = NavLevelThreeComponent;
}

// NIVEL 1: Componente Raíz dentro del IonNav
@Component({
  selector: 'app-nav-root',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Navigation Component</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Pila de Navegación (IonNav)</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Este ejemplo demuestra el paso de parámetros (<code>componentProps</code>) y la navegación multinivel (push, pop y popToRoot).
          </p>

          <ion-list lines="full" class="ion-margin-top">
            <ion-item>
              <ion-label>
                <h3>Navegar con datos</h3>
                <p>Envía información al siguiente nivel de la pila.</p>
              </ion-label>
            </ion-item>
          </ion-list>

          <ion-nav-link [component]="componenteDetalle" [componentProps]="datosParaEnviar">
            <ion-button expand="block" color="secondary" class="ion-margin-top">
              Ir al Nivel 2 con Datos
            </ion-button>
          </ion-nav-link>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonNavLink,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class NavRootComponent {
  componenteDetalle = NavDetailComponent;
  datosParaEnviar = {
    nombreUsuario: 'Alex Yulian',
    idSesion: 10852
  };
}

// CONTENEDOR PRINCIPAL
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonNav
  ]
})
export class NavigationPage {
  public rootPage = NavRootComponent;
}
