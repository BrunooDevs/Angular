import { Cliente } from "../cliente/cliente";
import { clientesss } from "../clientes/clientes";
import { precio } from "../precio/precio";
import { seccion } from "../seccion/seccion";

export class producto {

    nproducto: number =0;
    nombre: string | undefined;
    
    seccion: seccion[] | undefined ;


    cliente: Cliente[] | undefined ;

    nprecio: number | undefined

    
    prec: precio[] | undefined ;

}
