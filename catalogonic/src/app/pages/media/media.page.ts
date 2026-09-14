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
  IonImg,
  IonAvatar,
  IonThumbnail,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  playOutline,
  pauseOutline,
  volumeHighOutline,
  imageOutline,
  videocamOutline,
  musicalNotesOutline,
  downloadOutline,
  shareSocialOutline,
  heartOutline
} from 'ionicons/icons';

interface MediaItem {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  categoria: string;
}

@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
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
    IonImg,
    IonAvatar,
    IonThumbnail,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge
  ]
})
export class MediaPage {

  public reproduciendoAudio: boolean = false;
  public mediaSeleccionado: string = '';

  public galeria: MediaItem[] = [
    { id: 1, titulo: 'Montañas al Atardecer', descripcion: 'Paisaje natural en alta resolución', url: 'https://picsum.photos/600/400?random=1', categoria: 'Naturaleza' },
    { id: 2, titulo: 'Arquitectura Moderna', descripcion: 'Diseño de interiores y exteriores', url: 'https://picsum.photos/600/400?random=2', categoria: 'Diseño' },
    { id: 3, titulo: 'Luces de la Ciudad', descripcion: 'Fotografía nocturna urbana', url: 'https://picsum.photos/600/400?random=3', categoria: 'Urbano' },
    { id: 4, titulo: 'Bosque en Niebla', descripcion: 'Ambiente tranquilo y misterioso', url: 'https://picsum.photos/600/400?random=4', categoria: 'Naturaleza' }
  ];

  constructor() {
    addIcons({
      playOutline,
      pauseOutline,
      volumeHighOutline,
      imageOutline,
      videocamOutline,
      musicalNotesOutline,
      downloadOutline,
      shareSocialOutline,
      heartOutline
    });
  }

  toggleAudio() {
    this.reproduciendoAudio = !this.reproduciendoAudio;
  }

  onSeleccionarMedia(titulo: string) {
    this.mediaSeleccionado = titulo;
  }

}
