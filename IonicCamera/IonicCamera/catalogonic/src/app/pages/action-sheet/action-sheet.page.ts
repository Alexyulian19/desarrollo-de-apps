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
  IonActionSheet,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash, share, close, heart } from 'ionicons/icons';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
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
    IonActionSheet,
    IonText
  ]
})
export class ActionSheetPage {

  public resultado: string = 'Ninguna opción seleccionada';

  public actionSheetButtons = [
    {
      text: 'Eliminar elemento',
      role: 'destructive',
      icon: 'trash',
      data: { action: 'delete' }
    },
    {
      text: 'Compartir contenido',
      icon: 'share',
      data: { action: 'share' }
    },
    {
      text: 'Añadir a favoritos',
      icon: 'heart',
      data: { action: 'favorite' }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      data: { action: 'cancel' }
    }
  ];

  constructor() {
    addIcons({ trash, share, close, heart });
  }

  logResult(ev: any) {
    const action = ev.detail.data?.action;
    if (action) {
      this.resultado = `Seleccionaste: ${action.toUpperCase()}`;
    } else {
      this.resultado = 'Cerraste el menú sin seleccionar';
    }
  }

}
