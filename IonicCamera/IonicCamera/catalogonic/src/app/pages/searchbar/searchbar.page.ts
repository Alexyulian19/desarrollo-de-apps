import { Component, OnInit } from '@angular/core';
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
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
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
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class SearchbarPage implements OnInit {
  public busquedaSimple: string = '';

  public frutasOriginales: string[] = [
    'Manzana',
    'Banana',
    'Cereza',
    'Fresa',
    'Naranja',
    'Uva',
    'Mango',
    'Piña',
    'Melón',
    'Sandía'
  ];
  public frutasFiltradas: string[] = [];

  ngOnInit() {
    this.frutasFiltradas = [...this.frutasOriginales];
  }

  handleInput(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.frutasFiltradas = this.frutasOriginales.filter((fruta) =>
      fruta.toLowerCase().includes(query)
    );
  }
}
