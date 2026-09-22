import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, ActionSheetController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { camera, trash, close } from 'ionicons/icons';
import { PhotoService } from '../services/photo';
import { UserPhoto } from '../services/user-photo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, CommonModule]
})
export class Tab2Page implements OnInit {

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {
    addIcons({ camera, trash, close });
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de la foto',
      buttons: [{
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
}
