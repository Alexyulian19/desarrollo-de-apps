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
  IonCheckbox,
  IonList,
  IonItem,
  IonText,
  IonButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  checkmarkOutline,
  shieldCheckmarkOutline,
  notificationsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
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
    IonCheckbox,
    IonList,
    IonItem,
    IonText,
    IonButton
  ]
})
export class CheckboxPage {

  public esIndeterminado: boolean = true;
  public aceptaTerminos: boolean = false;

  public listaPreferencias = [
    { nombre: 'Notificaciones por Email', completado: true },
    { nombre: 'Alertas SMS', completado: false },
    { nombre: 'Mensajes Push', completado: true }
  ];

  constructor() {
    addIcons({
      checkmarkOutline,
      shieldCheckmarkOutline,
      notificationsOutline
    });
  }

  toggleIndeterminado() {
    this.esIndeterminado = !this.esIndeterminado;
  }

  onIndeterminateChange(event: any) {
    console.log('Cambio en checkbox indeterminado:', event.detail.checked);
  }

  obtenerSeleccionados(): string {
    return this.listaPreferencias
      .filter(item => item.completado)
      .map(item => item.nombre)
      .join(', ') || 'Ninguno';
  }

}
