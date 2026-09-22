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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItemGroup,
  IonItemDivider,
  IonListHeader,
  IonNote
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  archiveOutline,
  trashOutline,
  pinOutline,
  callOutline,
  mailOutline,
  star,
  personOutline
} from 'ionicons/icons';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
  avatar: string;
  favorito: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
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
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItemGroup,
    IonItemDivider,
    IonListHeader,
    IonNote
  ]
})
export class ListPage {

  public accionRealizada: string = '';

  public listaContactos: Contacto[] = [
    { id: 1, nombre: 'Carlos Mendoza', telefono: '+57 310 123 4567', avatar: 'https://ionicframework.com/docs/img/demos/avatar.ionic.png', favorito: true },
    { id: 2, nombre: 'Ana María Gómez', telefono: '+57 320 987 6543', avatar: 'https://picsum.photos/80/80?random=11', favorito: false },
    { id: 3, nombre: 'David Rodríguez', telefono: '+57 300 555 4433', avatar: 'https://picsum.photos/80/80?random=12', favorito: true },
    { id: 4, nombre: 'Laura Fernández', telefono: '+57 315 444 2211', avatar: 'https://picsum.photos/80/80?random=13', favorito: false }
  ];

  constructor() {
    addIcons({
      archiveOutline,
      trashOutline,
      pinOutline,
      callOutline,
      mailOutline,
      star,
      personOutline
    });
  }

  onArchivar(contacto: Contacto, slidingItem: IonItemSliding) {
    this.accionRealizada = `Contacto archivado: ${contacto.nombre}`;
    slidingItem.close();
  }

  onEliminar(id: number, slidingItem: IonItemSliding) {
    const contacto = this.listaContactos.find(c => c.id === id);
    this.accionRealizada = `Contacto eliminado: ${contacto?.nombre}`;
    this.listaContactos = this.listaContactos.filter(c => c.id !== id);
    slidingItem.close();
  }

  onFijar(contacto: Contacto, slidingItem: IonItemSliding) {
    contacto.favorito = !contacto.favorito;
    this.accionRealizada = `${contacto.nombre} ${contacto.favorito ? 'marcado como favorito' : 'desmarcado'}`;
    slidingItem.close();
  }

}
