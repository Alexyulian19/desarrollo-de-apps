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
  IonToast,
  IonButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { informationCircleOutline, checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
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
    IonToast,
    IonButton
  ]
})
export class ToastPage {
  public isToastOpen = false;

  public toastButtons = [
    {
      text: 'Deshacer',
      role: 'info',
      handler: () => {
        console.log('Acción deshacer cliqueada');
      },
    },
    {
      text: 'Cerrar',
      role: 'cancel',
      handler: () => {
        console.log('Toast cerrado');
      },
    },
  ];

  constructor() {
    addIcons({
      informationCircleOutline,
      checkmarkCircleOutline,
      alertCircleOutline
    });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
