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
  IonRange,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { volumeMuteOutline, volumeHighOutline, sunnyOutline, sunny } from 'ionicons/icons';

@Component({
  selector: 'app-range',
  templateUrl: './range.page.html',
  styleUrls: ['./range.page.scss'],
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
    IonRange,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
  ]
})
export class RangePage {
  public valorSimple: number = 40;
  public valorDual: { lower: number; upper: number } = { lower: 20, upper: 80 };
  public valorPasos: number = 50;

  constructor() {
    addIcons({ volumeMuteOutline, volumeHighOutline, sunnyOutline, sunny });
  }

  pinFormatter(value: number) {
    return `${value}%`;
  }
}
