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
  IonToggle,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notificationsOutline, wifiOutline, bluetoothOutline, moonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.page.html',
  styleUrls: ['./toggle.page.scss'],
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
    IonToggle,
    IonIcon
  ]
})
export class TogglePage {
  public notificaciones: boolean = true;
  public wifi: boolean = true;
  public bluetooth: boolean = false;
  public modoOscuro: boolean = false;

  constructor() {
    addIcons({
      notificationsOutline,
      wifiOutline,
      bluetoothOutline,
      moonOutline
    });
  }
}
