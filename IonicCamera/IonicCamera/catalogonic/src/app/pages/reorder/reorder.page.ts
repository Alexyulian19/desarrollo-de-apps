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
  IonReorderGroup,
  IonReorder,
  IonButton,
  IonIcon,
  ItemReorderEventDetail
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { reorderTwoOutline, swapVerticalOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.page.html',
  styleUrls: ['./reorder.page.scss'],
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
    IonReorderGroup,
    IonReorder,
    IonButton,
    IonIcon
  ]
})
export class ReorderPage {
  public frutas: string[] = ['Manzana', 'Banana', 'Cereza', 'Fresa', 'Naranja', 'Uva'];
  public reorderDeshabilitado: boolean = false;

  constructor() {
    addIcons({ reorderTwoOutline, swapVerticalOutline });
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.frutas = ev.detail.complete(this.frutas);
  }

  toggleReorder() {
    this.reorderDeshabilitado = !this.reorderDeshabilitado;
  }
}
