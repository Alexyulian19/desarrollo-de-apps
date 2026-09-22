import { Component } from '@angular/core';
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
  IonIcon,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heart,
  paperPlaneOutline,
  trashOutline,
  starOutline,
  openOutline,
  homeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonIcon,
    IonText
  ]
})
export class ButtonPage {

  public contador: number = 0;
  public estadoMensaje: string = 'Esperando interacción...';

  constructor() {
    addIcons({
      heart,
      paperPlaneOutline,
      trashOutline,
      starOutline,
      openOutline,
      homeOutline
    });
  }

  incrementarClicks() {
    this.contador++;
    this.estadoMensaje = `Has hecho clic ${this.contador} vez/veces en el botón interactivo.`;
  }

}
