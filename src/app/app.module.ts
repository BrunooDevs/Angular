import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component'
import { ClienteService } from './clientes/cliente.service';

/*agregamos el modulo HTTPCliente que nos permite en nuestra clase service poder
conectarnos con nuestro servidor ,HTTPCliente es el mecanismo el componente
para la comunicacion con el servidor remoto atraves de peticiones http con los diferentes verbos, get,post,put,delete, NOTA: tambien lo tenemos que agregar en 
imports:*/
import {HttpClientModule} from '@angular/common/http';

/* ROUTERS */
import { RouterModule,Routes } from '@angular/router';
import { FormComponent } from './clientes/form.component';

/*este modulo sirve para trabajar con formularios */
import { FormsModule } from '@angular/forms';

/*sirve para cambiar el tipo de traduccion de una pagina , en este caso cambiamos de ingles a españos ya que la fecha se ve en ingles */
import localeES from '@angular/common/locales/es-MX';

/*  registerLocaleData sirve para registrar un nuevo locale (cambie de traduccion de ingles a español) */
import { registerLocaleData } from '@angular/common';

 //se utiliza para cambiar el locale de ingles a español, se ara de forma global en toda la aplicacion 
 registerLocaleData(localeES,"es");


/*en este arreglo de Rutas (Routes)  vamos a definir todas las rutas url de cada componente de nuestra aplicacion
path: contiene una url puede ser el nombre que queramos de nuestra ruta (el path vacio indica que seria nuestra pagina principal)
redirectTo: no redigiria a /clientes
pathMatch: 'full': indica que haga un match completo con la url

component: le asignamos o lo mapeamos la url a un componente
*/
const routes: Routes = [
  {path: '', redirectTo: './clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path:  'clientes/form', component: FormComponent},
  {path:  'clientes/form/:id', component: FormComponent} //uri para ver un cliente solo por su id
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /* se importan nuestras ruta aqui en import, en este caso el objeto routes */
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
