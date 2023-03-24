import { Component } from "@angular/core";


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
    
})
export class FooterComponent {

    /*any es de un tipo generico que puede ser cualquier tipo, se utliza para crear objetos genericos que no sean de un tipo de una clase en particular*/ 

   public autor: any = {nombre:'Moises ', apellido:'Hernandez'}


}
