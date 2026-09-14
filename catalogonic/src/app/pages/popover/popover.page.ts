import { Component, ViewChild } from '@angular/core';
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
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  ellipsisVertical,
  personOutline,
  settingsOutline,
  logOutOutline,
  helpCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
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
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    IonIcon,
    IonLabel
  ]
})
export class PopoverPage {
  @ViewChild('popoverMenu') popoverMenu!: IonPopover;
  public opcionSeleccionada: string = '';

  constructor() {
    addIcons({
      ellipsisVertical,
      personOutline,
      settingsOutline,
      logOutOutline,
      helpCircleOutline
    });
  }

  onOpcionClick(opcion: string) {
    this.opcionSeleccionada = opcion;
    this.popoverMenu.dismiss();
  }
}
