import { Component,OnInit } from '@angular/core';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import { usuario } from './usuario';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'

})

export class UsuarioComponent implements OnInit{


  usuario: usuario[] | undefined ;

  /* private clienteService: ClienteService: se define el atributo y asu vez tambien se injecta el valor, esto seria lo mismo que definir uque definirlo en el cuerpo de la clase */
  constructor(private usuarioService: UsuarioService){

  }

  /*ngOnInit(): es un evento, recordemos que este evento es cuando se inicia el componente */
  
  /*subscribe: sirve para suscribir, getClientes().suscribe indica que va hacer observado por observadores*/
  ngOnInit() {
    this.usuarioService.getClientes().subscribe(

      /* este metodo es el observador, se asigna en el atributo clientes el valor que se esta recibiendo desde el cliente service que seria el listado de clientes con los posibles cambios */

      /* clientes => this.clientes = clientes ,es una  funcion anonima este es una forma que tiene typeScript para simplificar las funciones anonimas o de flecha), function clientes que seria nuestro argumento el resultado de nuestro stream, entonces (clientes) pasamos los clientes que seria el resultado del stream convertido a un listado de clientes y se lo asignamos al atributo de clientes this.clientes  */

        (usuarios) => {
          this.usuario = usuarios
        }
    );
  }

  /*este objeto se pasa al evento del boton al evento click, */
  delete (usuario: usuario) : void{
    
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que deseas eliminar el precio ${usuario.id}  ${usuario.nombre} ? `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        /**como estamos en el listado de clientes quitar del listado de clientes el objeto cliente que se elimino para que se actualice de forma automatica */
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            //this.clientes es el arreglo que estamos mostrando, y clientes es la lista actual    
            /*el metodo filter() de array, nos permite filtrar solo los elementos que deseamos(segun ciertos criterios ) y devolver en un nuevo array  
            
            cli => cli !== cliente: indica que si cli de cliente es distinto al cliente que vamos a eliminar si es distinto lo vamos a mostrar en la lista si no lo va a quitar de la lista al cliente eliminado*/
              this.usuario = this.usuario?.filter(cli => cli !== usuario);
          }

        );
        swalWithBootstrapButtons.fire(
         
          'precio eliminado!',
          `precio ${usuario.id} eliminado con exito`,
          'success'
        )

      } 
    })





  }





}
