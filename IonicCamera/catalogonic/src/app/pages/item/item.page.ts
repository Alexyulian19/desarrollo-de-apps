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
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonThumbnail,
  IonText,
  IonListHeader,
  IonItemDivider,
  IonNote
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  wifiOutline,
  heartOutline,
  personOutline,
  notificationsOutline,
  trashOutline,
  mailOutline,
  documentTextOutline,
  starOutline
} from 'ionicons/icons';

interface NotificacionItem {
  id: number;
  titulo: string;
  subtitulo: string;
  mensaje: string;
  hora: string;
  icono: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonBadge,
    IonAvatar,
    IonThumbnail,
    IonText,
    IonListHeader,
    IonItemDivider,
    IonNote
  ]
})
export class ItemPage {

  public itemSeleccionado: string = '';

  public listaNotificaciones: NotificacionItem[] = [
    {
      id: 1,
      titulo: 'Nuevo Mensaje',
      subtitulo: 'Soporte Técnico',
      mensaje: 'Su ticket #4082 ha sido resuelto con éxito.',
      hora: '10:45 AM',
      icono: 'mail-outline'
    },
    {
      id: 2,
      titulo: 'Actualización Disponible',
      subtitulo: 'Sistema',
      mensaje: 'La versión 2.0 ya se encuentra lista para instalar.',
      hora: 'Ayer',
      icono: 'document-text-outline'
    }
  ];

  constructor() {
    addIcons({
      wifiOutline,
      heartOutline,
      personOutline,
      notificationsOutline,
      trashOutline,
      mailOutline,
      documentTextOutline,
      starOutline
    });
  }

  onSeleccionar(opcion: string) {
    this.itemSeleccionado = opcion;
  }

}
