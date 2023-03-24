import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //indica nuestras vista asociada a esta clase 
  styleUrls: ['./app.component.css'] //indica las hojas de estilos
})

export class AppComponent {
  title = 'Bienvenido a Angular';
  curso = 'Curso spring 5 con Angular';
  profesor= 'moises hernandez bruno';
}
