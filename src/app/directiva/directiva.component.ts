import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  constructor(){};

  listaCurso: string[] = ['Producto 1','Producto 2','Producto 3','Producto 4','Producto 5'];
  habilitar: boolean = true;



  /**  (click)="habilitar = (habilitar==true) ? false: true" , cuando se de clic preguntara si habilitar es true, si es true lo pondra en falso y si es falso lo pondra en true  */
  
  setHabilitar():void{
    this.habilitar = (this.habilitar==true) ? false: true
  }








}


