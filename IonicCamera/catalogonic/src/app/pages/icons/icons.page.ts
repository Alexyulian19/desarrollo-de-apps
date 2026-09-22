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
  IonIcon,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  heart,
  heartOutline,
  heartSharp,
  star,
  starOutline,
  starSharp,
  personOutline,
  homeOutline,
  settingsOutline,
  mailOutline,
  searchOutline,
  trashOutline,
  cameraOutline,
  wifiOutline,
  notificationsOutline,
  callOutline,
  cartOutline,
  locationOutline
} from 'ionicons/icons';

interface IconInfo {
  nombre: string;
}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.page.html',
  styleUrls: ['./icons.page.scss'],
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
    IonIcon,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  ]
})
export class IconsPage {

  public readonly coleccionIconos: IconInfo[] = [
    { nombre: 'person-outline' },
    { nombre: 'home-outline' },
    { nombre: 'settings-outline' },
    { nombre: 'mail-outline' },
    { nombre: 'search-outline' },
    { nombre: 'trash-outline' },
    { nombre: 'camera-outline' },
    { nombre: 'wifi-outline' },
    { nombre: 'notifications-outline' },
    { nombre: 'call-outline' },
    { nombre: 'cart-outline' },
    { nombre: 'location-outline' }
  ];

  public iconosFiltrados: IconInfo[] = [...this.coleccionIconos];
  public iconoSeleccionado: string = '';

  constructor() {
    addIcons({
      heart,
      heartOutline,
      heartSharp,
      star,
      starOutline,
      starSharp,
      personOutline,
      homeOutline,
      settingsOutline,
      mailOutline,
      searchOutline,
      trashOutline,
      cameraOutline,
      wifiOutline,
      notificationsOutline,
      callOutline,
      cartOutline,
      locationOutline
    });
  }

  filtrarIconos(event: any) {
    const query = event.detail.value ? event.detail.value.toLowerCase().trim() : '';
    if (!query) {
      this.iconosFiltrados = [...this.coleccionIconos];
      return;
    }
    this.iconosFiltrados = this.coleccionIconos.filter(icon =>
      icon.nombre.toLowerCase().includes(query)
    );
  }

  seleccionarIcono(nombre: string) {
    this.iconoSeleccionado = nombre;
  }

}
