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
  IonAlert,
  IonText
} from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
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
    IonAlert,
    IonText
  ]
})
export class AlertPage {

  public resultado: string = 'Ninguna acción realizada';

  public alertButtons = ['Entendido'];

  public confirmButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Aceptar',
      role: 'confirm'
    }
  ];

  constructor() {}

  logResult(ev: any) {
    if (ev.detail.role === 'confirm') {
      this.resultado = 'El usuario presionó ACEPTAR';
    } else if (ev.detail.role === 'cancel') {
      this.resultado = 'El usuario presionó CANCELAR';
    } else {
      this.resultado = 'Cuadro de diálogo cerrado';
    }
  }

}
