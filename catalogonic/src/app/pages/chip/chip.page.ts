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
  IonChip,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonButton,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  pinOutline,
  heart,
  closeCircle,
  checkmarkCircle
} from 'ionicons/icons';

interface FiltroItem {
  nombre: string;
  seleccionado: boolean;
}

@Component({
  selector: 'app-chip',
  templateUrl: './chip.page.html',
  styleUrls: ['./chip.page.scss'],
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
    IonChip,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonButton,
    IonText
  ]
})
export class ChipPage {

  public readonly tagsOriginales: string[] = ['Angular', 'Ionic', 'TypeScript', 'RxJS', 'Sass'];
  public tags: string[] = [...this.tagsOriginales];

  public filtros: FiltroItem[] = [
    { nombre: 'Música', seleccionado: true },
    { nombre: 'Deportes', seleccionado: false },
    { nombre: 'Tecnología', seleccionado: true },
    { nombre: 'Viajes', seleccionado: false }
  ];

  constructor() {
    addIcons({
      pinOutline,
      heart,
      closeCircle,
      checkmarkCircle
    });
  }

  removerTag(tagAEliminar: string) {
    this.tags = this.tags.filter(tag => tag !== tagAEliminar);
  }

  restaurarTags() {
    this.tags = [...this.tagsOriginales];
  }

  toggleFiltro(filtro: FiltroItem) {
    filtro.seleccionado = !filtro.seleccionado;
  }

}
