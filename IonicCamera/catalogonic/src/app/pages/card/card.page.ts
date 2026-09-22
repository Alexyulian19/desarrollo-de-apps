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
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  informationCircleOutline,
  mailOutline,
  starOutline,
  heartOutline,
  shareSocialOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
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
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonBadge,
    IonButton
  ]
})
export class CardPage {

  constructor() {
    addIcons({
      informationCircleOutline,
      mailOutline,
      starOutline,
      heartOutline,
      shareSocialOutline
    });
  }

  onCardClick() {
    console.log('Tarjeta interactiva presionada');
  }

}
