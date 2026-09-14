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
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
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
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonItem,
    IonLabel,
    IonText
  ]
})
export class DatetimePage {

  public fechaSeleccionada: string = new Date().toISOString();
  public horaSeleccionada: string = '14:30';

  constructor() {
    addIcons({
      calendarOutline,
      timeOutline
    });
  }

}
