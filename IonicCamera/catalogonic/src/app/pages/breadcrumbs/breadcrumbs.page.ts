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
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
  IonText,
  IonPopover,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  folderOutline,
  documentTextOutline,
  chevronForwardOutline,
  ellipsisHorizontalCircleOutline,
  layersOutline,
  personOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.page.html',
  styleUrls: ['./breadcrumbs.page.scss'],
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
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonText,
    IonPopover,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class BreadcrumbsPage {

  public seleccionado: string = 'Seguridad (por defecto)';
  public isPopoverOpen: boolean = false;
  public popoverEvent: any = null;

  constructor() {
    addIcons({
      homeOutline,
      folderOutline,
      documentTextOutline,
      chevronForwardOutline,
      ellipsisHorizontalCircleOutline,
      layersOutline,
      personOutline,
      settingsOutline
    });
  }

  presentPopover(ev: any) {
    this.popoverEvent = ev;
    this.isPopoverOpen = true;
  }

  onBreadcrumbClick(ev: any) {
    this.seleccionado = ev.detail.value || 'Elemento final';
  }

}
