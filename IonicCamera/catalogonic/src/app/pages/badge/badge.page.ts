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
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
  IonChip
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  notificationsOutline,
  checkmarkOutline,
  starOutline,
  flameOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.page.html',
  styleUrls: ['./badge.page.scss'],
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
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonAvatar,
    IonChip
  ]
})
export class BadgePage {

  public contador: number = 5;

  constructor() {
    addIcons({
      mailOutline,
      notificationsOutline,
      checkmarkOutline,
      starOutline,
      flameOutline
    });
  }

  incrementar() {
    this.contador++;
  }

  reiniciar() {
    this.contador = 0;
  }

}
