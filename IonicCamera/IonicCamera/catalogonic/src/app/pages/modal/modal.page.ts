import { Component, ViewChild } from '@angular/core';
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
  IonModal,
  IonItem,
  IonInput,
  IonLabel,
  IonList
} from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
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
    IonModal,
    IonItem,
    IonInput,
    IonLabel,
    IonList
  ]
})
export class ModalPage {
  @ViewChild(IonModal) modal!: IonModal;

  public nombreModal: string = '';
  public mensajeConfirmacion: string = '';

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmar() {
    this.modal.dismiss(this.nombreModal, 'confirm');
  }

  onWillDismiss(event: any) {
    const ev = event as CustomEvent<{ data: string; role: string }>;
    if (ev.detail.role === 'confirm' && ev.detail.data) {
      this.mensajeConfirmacion = `Hola, ${ev.detail.data}! El modal se cerró correctamente.`;
    } else if (ev.detail.role === 'cancel') {
      this.mensajeConfirmacion = 'Se canceló el ingreso de datos.';
    }
  }
}
