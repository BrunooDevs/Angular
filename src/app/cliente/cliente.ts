import { producto } from "../producto/producto";
import { seccion } from "../seccion/seccion";

export class Cliente {

    id: number =0;
    nombre: string | undefined;
    apellidos: string | undefined;
    createAt: string ="";

    //private List<seccion> secciones;
     //definimos una variable local dentro de un metodo
    secciones: seccion[] | undefined ;

    productos: producto[] | undefined ;

    email: string | undefined;
    estado: number = 1;

}
