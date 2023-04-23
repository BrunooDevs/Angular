import { Injectable } from '@angular/core';
import { clientesss } from './clientesss';

/* esta libreria es para trabajar con http*/
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* asi se importa para angular 6, el of se usa para crear el objeto obervable y el objeto observable seria el tipo de dato de la clase observable que representa nuestro flujo
 reactivo */
import { of,catchError,throwError, map } from 'rxjs';

/*rx: react extension asi se importa para angular 6 */
import { Observable } from 'rxjs';



// ES6 Modules or TypeScript
import swal from 'sweetalert2';

import { Router } from '@angular/router';

/* formatDate sirve para dar formato a na fecha  */
import { formatDate } from '@angular/common';



/*la anotacion @Injectable se pone a las clase de servicio, y se puede injectar a otro componente*/ 


/*la anotacion @Injectable se pone a las clase de servicio, y se puede injectar a otro componente*/ 
@Injectable({
  providedIn: 'root'
})
export class ClientesService {


/*este es la url de mi endpoint de mi servidor backend echa en spring */
private uriEndPoint:string = "http://localhost:8080/api/clientesss"

/*por constructor pasamos el context type */
private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  /* private http: HttpClient: se define el atributo y asu vez tambien se injecta el valor, esto seria lo mismo que definir uque definirlo en el cuerpo de la clase ademas http queda como un atributo de la clase*/
constructor( private http: HttpClient, private router: Router) { }

/* es importante entender el objeto Observable esta basado en el patron de diseño Observador es decir que tenemos un sujeto en este caso seria Observable <Cliente[]> y tambien tenemos observadores que estan atentos escuchando un posible cambio en el sujeto en este caso en el cliente, estos observadores se suscriben al sujeto que seria el objeto Observable y cuando cambia su estado se les notifica a los observadores y se gatilla algun tipo de proceso o tarea a algun evento */

/* el of se usa para crear el objeto obervable y el objeto observable seria el tipo de dato de la clase observable que representa nuestro flujo
reactivo */
getClientes():Observable <clientesss[]>{

  //of sirve para crear el objeto observable
  /* convertimos / creamos nuestro flujo Observable a partir de los objetos CLIENTES
  (se convierte en un string en un flujo de datos) */
 // return of(CLIENTES);

 /*http.get indica el verbo el tipo de peticion, adentro debe de ir la url ,
 ademas tenemos que convertir este resultado ya que nos retorna un observable de un tipo any de un tipo generico entonces tenemos que hacer un cast para que sea de tipo cliente <Cliente[]
 NOTA: EL http.get SEIMPRE RETOTNA UN OBJETO observable, dentro del cuerpo de la
 respuesta va a devolver un objeto de tipo JSON por defecto sin tipo un tipo any,
 es por eso que se hace un cast para convertir al tipo deseado en te caso a <Cliente[]>
 */
  return this.http.get<clientesss[]>(this.uriEndPoint).pipe(

    /* map: permite cambiar de un tipo de dato a otro tipo de dato, ademas tambien nos permite cambiar los datos dentro de un objeto ya sea modificar un dato , un atributo o agregar valores a un objeto,   debe de retornar el objeto modificado, modificando sus valores este map lo que hace es poner los nombre de los clientes en mayusculas*/
    map(response => {

      //definimos una variable local dentro de un metodo
      let clientes = response as clientesss[];

      /*retornamos el objeto clientes, utilizamos el parametro map del objeto c lientes para cambiar los datos del flujo  como argumento recibe cada argumento del arreglo en este caso el objeto cliente, por cada cliente cambiamos su nombre a matusculas*/
      return clientes.map(clientesss => {
          clientesss.nombre = clientesss.nombre?.toUpperCase();
          
          /*le damos otro formato que se vea a la fecha
          el primer parametro indica la fecha original,
          segundo seria nuestro formato,
          el tercero seria el locale
          NOTA: si quisieramos poner el nombre completo de la fecha quedatia de la siguiente forma el formato EEEE dd-MMMM-yyyy*/

      

          //retornamos a cada cliente del arreglo
          return clientesss;
      });
    })
  );

}

//recibe el objeto cliente en formato JSON
/** 
NOTA: para obtener los mensajes de que nos envia el servidor necesutamos retornar
Observable<any> ya que retornamos un Hasmap desde el backen y con any le decimos que puede ser cualquier tipo de datos que se recibira, de esta forma obtenemos los mensajes directamente de la respuesta */
create(cliente: clientesss) : Observable<any>{

  /*como primer parametro mandamos la url, como segundo los datos a mandar al servidor a nuestra api rest y como tercer parametro las cabeceras http que ira
  en forma de un objeto*/
  return this.http.post<any>(this.uriEndPoint,cliente ,{headers : this.httpHeaders}).pipe(

    catchError((e) => {

      /**verificamos que el e de erro no tenga el erro 400 que nos envia el backen del metodo create() d spring, estos errores los manejamos de forma distinta a los otros errores 
       * NOTA: NO CONFUNDIR error con errors que nos envian desde el backend
       */
      if(e.status == 400){
        /*retornamos el error para que el componente se encargue de este error, lo captura el componente en el metodo suscribe() capturamos el error y pasamos estos errores a la plantilla para mostrarlos */
        return throwError(() => e);
      }

      swal.fire( e.error.mensaje, e.error.error,  'error');
      console.error(e.error.mensaje);

        /*convertimos un error en un observable */
        return throwError(() => e);
    })

  );
}

//metodo que edita un cliente
getCliente( id: number) : Observable<clientesss> {
  /*stream de interpolacion  `` soncomillas invertidas agregamos la variable uriEndPoint*/
  return this.http.get<clientesss>( `${this.uriEndPoint}/${id}`).pipe(

    /**obtenemos el error en dado caso de que aya uno atraves del estado de la respuesta, desde spring retornamos cuando no encuentra el objeto o el registro por su id retornamos un 404 o si ocurre un error en la bd retornamos en internal server error */
    catchError((e) => {

      this.router.navigate(['/clientes']);
      swal.fire('Error al editar', e.error.mensaje,  'error');
        console.error(e);

        /*convertimos un error en un observable */
        return throwError(() => e);
    })

  );
}



/*HTTP PUT  se usa para actualizar datos en el servidor REST. A diferencia de POST que es para crear 

/*como primer parametro mandamos la url, como segundo los datos a mandar al servidor a nuestra api rest y como tercer parametro las cabeceras http que ira
  en forma de un objeto

NOTA: para obtener los mensajes de que nos envia el servidor necesutamos retornar
Observable<any> ya que retornamos un Hasmap desde el backen y con any le decimos que puede ser cualquier tipo de datos que se recibira, de esta forma obtenemos los mensajes directamente de la respuesta   
*/
update(cliente: clientesss) : Observable<any> {
  return this.http.put<any>(`${this.uriEndPoint}/${cliente.ncliente}`,cliente, {headers: this.httpHeaders}).pipe(

    catchError((e) => {

      if(e.status == 400){
        /*retornamos el error para que el componente se encargue de este error, lo captura el componente en el metodo suscribe() capturamos el error y pasamos estos errores a la plantilla para mostrarlos */
        return throwError(() => e);
      }

      swal.fire( e.error.mensaje, e.error.error,  'error');
      console.error(e.error.mensaje);

        /*convertimos un error en un observable */
        return throwError(() => e);
    })
  );
}

delete (id: number) : Observable<clientesss>{
  return this.http.delete<clientesss>(`${this.uriEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(

    catchError((e) => {

      swal.fire( e.error.mensaje, e.error.error,  'error');
      console.error(e.error.mensaje);

        /*convertimos un error en un observable */
        return throwError(() => e);
    })

  );
}











  
}
