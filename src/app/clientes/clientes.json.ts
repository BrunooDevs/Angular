import { Cliente } from './cliente';

  /*sera un arreglo de objetos clientes , objetos con formato JSON 
  NOTA: se le pone export para que se pueda exportar, ademas es una constante*/
export const CLIENTES: Cliente[] = [

    {id: 1,nombre: 'Moises', apellidos: 'lopez',email: 'lopez@gmail.com' , createAt: '2016-12-12'},

    {id: 2,nombre: 'cesar', apellidos: 'martinez',email: 'martinez@gmail.com' , createAt: '2017-12-12'},

    {id: 3,nombre: 'julio', apellidos: 'sanchez',email: 'sanchez@gmail.com' , createAt: '2018-12-12'},

    {id: 4,nombre: 'bruno', apellidos: 'valdez',email: 'valdez@gmail.com' , createAt: '2019-12-12'},

    {id: 5,nombre: 'ilda', apellidos: 'landa',email: 'landa@gmail.com' , createAt: '2020-12-12'}

  ];