import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardContent, IonItem, IonLabel, IonInput, IonSelect,
  IonSelectOption, IonButton, IonCardHeader, IonCardTitle, IonList
} from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardContent, IonItem, IonLabel, IonInput, IonSelect,
    IonSelectOption, IonButton, IonCardHeader, IonCardTitle, IonList
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
