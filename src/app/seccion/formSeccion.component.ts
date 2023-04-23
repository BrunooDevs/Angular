import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { seccion } from './seccion';
import { SeccionService } from './seccion.service';

@Component({
    selector: 'app-formSeccion',
    templateUrl: './formSeccion.component.html'
    
  })

export class formSeccion implements OnInit{


    public seccion: seccion = new seccion();
    public titulo: string = "Crear cliente;";
  
    /*este es un arreglo de errores el cual contiene los errores del backend de spring validation de las entitys  */
    public errores: string[] | undefined;
  
  
    constructor(private SeccionService: SeccionService,private router: Router,private activatRoute: ActivatedRoute){
  
    }
  
    /*tenemos que llamar a  cargarCliente() una vez que se inicialize el componente
    para que pueble los datos de cliente*/
    ngOnInit() {
      this.cargarCliente();
    }
  
  //recibe el objeto cliente en formato JSON desde el formulario
    public create(): void{
      
      this.SeccionService.create(this.seccion).subscribe(
  
        /*retorno a /clientes para mostrar el nuevo cliente creado o al cliente que se modifico,como es mas de una linea se agregar los parentesis entre this.router.navigate(['/clientes'])
        
        this.router.navigate(['/clientes'> retorno al usuario a /clientes
  
        json puede ser cualquier nombre como respuesta o response
        */
        json => {this.router.navigate(['/secciones'])
                    //se crea una alerta sweetalert
  
                    /*  nota: ${json.mensaje} es el mensaje que le mandamos desde el back y tambien el {json.cliente.nombre} */
                     swal.fire(  'Nueva seccion', `${json.mensaje}: ${json.seccion.nombre}`,  'success');
  
                    },
                    err => {
                      /*err serian los errores que nos envia el clienteService y error el atributo del objeto err que contiene el json enviado por el backen desde spring,y en el json pasamos los erores dentro del parametro errors 
                      
                      err.error.errors como viene de tipo any, lo convertimos a tipo arreglo de string*/
                      this.errores = err.error.errors as string[];
                      console.error(this.errores);
                      console.error("codigo del error desde el backend " + err.status);
                    }
      );
  
    }
  
  
    cargarCliente() : void{
  
      /* vamos a suscribir un observador, que este observando obtengamos el id, cuando se lo pasemos por parametro , recibe como argumentos los parametros ala fucion anonima 
      
      "params" que es un observable y que nos sirve para suscribirnos a cambios en los parámetros enviados al componente.
  
      una función callback que se ejecutará con cada cambio de aquello que se está observando.
      subscribe()" es el método para suscribirnos a los cambios. A suscribe le enviaremos una función callback, la cual recibirá el nuevo valor, y se ejecutará cada vez que cambie.
      */
      this.activatRoute.params.subscribe(
        params => {let id = params['id']
  
        //preguntamos si el id existe
          if(id){
                              /*suscribimos para registrar el observador que asgina el cliente de la consulta al atributo cliente de esta clase */
              this.SeccionService.getCliente(id).subscribe(
                  (cliente) => this.seccion = cliente
              );
          }
      }
      );
    }
  
   
    update() : void {
      this.SeccionService.update(this.seccion).subscribe(
        json => {this.router.navigate(['/secciones'])
        swal.fire(  'seccion actualizado', `${json.mensaje}: ${json.seccion.nombre}`,  'success')
  
        console.log(json.seccion.nombre)
        console.log(json.seccion.nseccion)
        console.log(json.seccion.edo)
  
       },
       err => {
         /*err serian los errores que nos envia el clienteService y error el atributo del objeto err que contiene el json enviado por el backen desde spring,y en el json pasamos los erores dentro del parametro errors 
         
         err.error.errors como viene de tipo any, lo convertimos a tipo arreglo de string*/
         this.errores = err.error.errors as string[];
         console.log(this.errores);
         console.log("codigo del error desde el backend" + err.status);
       }
       );
    }
  








}
