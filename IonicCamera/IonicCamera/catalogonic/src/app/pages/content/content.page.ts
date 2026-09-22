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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowUpOutline, arrowDownOutline } from 'ionicons/icons';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
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
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  ]
})
export class ContentPage {

  @ViewChild('contentArea', { static: false }) content!: IonContent;

  public scrollTop: number = 0;
  public elementos: number[] = Array.from({ length: 25 }, (_, i) => i + 1);

  constructor() {
    addIcons({
      arrowUpOutline,
      arrowDownOutline
    });
  }

  onScroll(event: CustomEvent) {
    this.scrollTop = Math.round(event.detail.scrollTop);
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }

}
