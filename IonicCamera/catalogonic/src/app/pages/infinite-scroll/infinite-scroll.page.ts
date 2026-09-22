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
  IonAvatar,
  IonBadge,
  IonButton,
  IonIcon,
  IonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { refreshOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
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
    IonAvatar,
    IonBadge,
    IonButton,
    IonIcon,
    IonText,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ]
})
export class InfiniteScrollPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  public elementos: string[] = [];
  public readonly limiteMaximo: number = 50;
  private readonly incremento: number = 10;

  constructor() {
    addIcons({
      refreshOutline,
      checkmarkCircleOutline
    });
    this.generarElementosIniciales();
  }

  generarElementosIniciales() {
    this.elementos = [];
    this.agregarMasElementos();
  }

  agregarMasElementos() {
    const inicio = this.elementos.length + 1;
    for (let i = inicio; i < inicio + this.incremento; i++) {
      if (this.elementos.length < this.limiteMaximo) {
        this.elementos.push(`Usuario Demo ${i}`);
      }
    }
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      this.agregarMasElementos();
      event.target.complete();

      if (this.elementos.length >= this.limiteMaximo) {
        event.target.disabled = true;
      }
    }, 1200);
  }

  reiniciarLista() {
    this.generarElementosIniciales();
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
  }

}
