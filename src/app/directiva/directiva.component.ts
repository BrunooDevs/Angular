import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  constructor(){};

  listaCurso: string[] = ['TypeScrip','JavaScrip','Java SE','C#','PHP'];
  habilitar: boolean = true;



  /**  (click)="habilitar = (habilitar==true) ? false: true" , cuando se de clic preguntara si habilitar es true, si es true lo pondra en falso y si es falso lo pondra en true  */
  
  setHabilitar():void{
    this.habilitar = (this.habilitar==true) ? false: true
  }








}


