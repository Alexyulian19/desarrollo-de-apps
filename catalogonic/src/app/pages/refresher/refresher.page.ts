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
  IonRefresher,
  IonRefresherContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { timeOutline, chevronDownCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
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
    IonRefresher,
    IonRefresherContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon
  ]
})
export class RefresherPage {
  public elementos: string[] = [
    'Elemento Registrado 1',
    'Elemento Registrado 2',
    'Elemento Registrado 3'
  ];
  public ultimaActualizacion: string = new Date().toLocaleTimeString();

  constructor() {
    addIcons({ timeOutline, chevronDownCircleOutline });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      const nuevoId = this.elementos.length + 1;
      this.elementos.unshift(`Elemento Actualizado ${nuevoId}`);
      this.ultimaActualizacion = new Date().toLocaleTimeString();

      event.target.complete();
    }, 1500);
  }
}
