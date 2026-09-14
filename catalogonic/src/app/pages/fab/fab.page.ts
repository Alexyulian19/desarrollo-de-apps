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
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel,
  IonText
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  addOutline,
  shareSocial,
  documentTextOutline,
  imageOutline,
  cameraOutline,
  logoInstagram,
  logoTwitter,
  logoFacebook,
  checkmarkDoneOutline,
  heart,
  heartOutline,
  heartDislikeOutline,
  star,
  lockClosedOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
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
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonLabel,
    IonText
  ]
})
export class FabPage {

  public ultimaAccion: string = '';

  constructor() {
    addIcons({
      add,
      addOutline,
      shareSocial,
      documentTextOutline,
      imageOutline,
      cameraOutline,
      logoInstagram,
      logoTwitter,
      logoFacebook,
      checkmarkDoneOutline,
      heart,
      heartOutline,
      heartDislikeOutline,
      star,
      lockClosedOutline
    });
  }

  ejecutarAccion(accion: string) {
    this.ultimaAccion = accion;
  }

}
