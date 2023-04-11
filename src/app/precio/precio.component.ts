import { Component,OnInit } from '@angular/core';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { precio } from './precio';
import { PrecioService } from './precio.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html'

})


export class PrecioComponent implements OnInit {



  precios: precio[] | undefined ;

  /* private clienteService: ClienteService: se define el atributo y asu vez tambien se injecta el valor, esto seria lo mismo que definir uque definirlo en el cuerpo de la clase */
  constructor(private precioService: PrecioService){

  }

  /*ngOnInit(): es un evento, recordemos que este evento es cuando se inicia el componente */
  
  /*subscribe: sirve para suscribir, getClientes().suscribe indica que va hacer observado por observadores*/
  ngOnInit() {
    this.precioService.getClientes().subscribe(

      /* este metodo es el observador, se asigna en el atributo clientes el valor que se esta recibiendo desde el cliente service que seria el listado de clientes con los posibles cambios */

      /* clientes => this.clientes = clientes ,es una  funcion anonima este es una forma que tiene typeScript para simplificar las funciones anonimas o de flecha), function clientes que seria nuestro argumento el resultado de nuestro stream, entonces (clientes) pasamos los clientes que seria el resultado del stream convertido a un listado de clientes y se lo asignamos al atributo de clientes this.clientes  */

        (precios) => {
          this.precios = precios
        }
    );
  }

  /*este objeto se pasa al evento del boton al evento click, */
  delete (precios: precio) : void{
    
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que deseas eliminar el precio ${precios.nprecio}  ${precios.precio} ? `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        /**como estamos en el listado de clientes quitar del listado de clientes el objeto cliente que se elimino para que se actualice de forma automatica */
        this.precioService.delete(precios.nprecio).subscribe(
          response => {
            //this.clientes es el arreglo que estamos mostrando, y clientes es la lista actual    
            /*el metodo filter() de array, nos permite filtrar solo los elementos que deseamos(segun ciertos criterios ) y devolver en un nuevo array  
            
            cli => cli !== cliente: indica que si cli de cliente es distinto al cliente que vamos a eliminar si es distinto lo vamos a mostrar en la lista si no lo va a quitar de la lista al cliente eliminado*/
              this.precios = this.precios?.filter(cli => cli !== precios);
          }

        );
        swalWithBootstrapButtons.fire(
         
          'precio eliminado!',
          `precio ${precios.precio} eliminado con exito`,
          'success'
        )

      } 
    })





  }











}
