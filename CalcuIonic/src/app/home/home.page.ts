import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  num1: string = '';
  num2: string = '';
  operacion: string = '+';
  resultado: string = '';
  historial: string[] = [];

  constructor() {}

  onNum1Change(event: any) {
    this.num1 = event.detail.value ?? '';
  }

  onNum2Change(event: any) {
    this.num2 = event.detail.value ?? '';
  }

  onOperacionChange(event: any) {
    this.operacion = event.detail.value ?? '+';
  }

  calcular() {
    const n1 = parseFloat(this.num1);
    const n2 = parseFloat(this.num2);

    if (isNaN(n1) || isNaN(n2)) {
      this.resultado = 'Ingrese ambos números';
      return;
    }

    let res: number;

    if (this.operacion === '+') {
      res = n1 + n2;
    } else if (this.operacion === '-') {
      res = n1 - n2;
    } else if (this.operacion === '*') {
      res = n1 * n2;
    } else if (this.operacion === '/') {
      if (n2 === 0) {
        this.resultado = 'No se puede dividir entre 0';
        return;
      }
      res = n1 / n2;
    } else {
      return;
    }

    this.resultado = res.toString();
    this.historial.unshift(`${n1} ${this.operacion} ${n2} = ${res}`);
  }
}
