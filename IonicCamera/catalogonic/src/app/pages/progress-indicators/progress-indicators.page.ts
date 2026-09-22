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
  IonProgressBar,
  IonSpinner,
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

@Component({
  selector: 'app-progress-indicators',
  templateUrl: './progress-indicators.page.html',
  styleUrls: ['./progress-indicators.page.scss'],
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
    IonProgressBar,
    IonSpinner,
    IonButton,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class ProgressIndicatorsPage {
  public progreso: number = 0.25;
  public buffer: number = 0.5;

  simularCarga() {
    this.progreso = 0;
    this.buffer = 0.1;

    const interval = setInterval(() => {
      this.progreso += 0.1;
      this.buffer += 0.15;

      if (this.progreso >= 1) {
        this.progreso = 1;
        this.buffer = 1;
        clearInterval(interval);
      }
    }, 300);
  }
}
