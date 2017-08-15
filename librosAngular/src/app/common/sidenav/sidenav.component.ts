import { Component } from '@angular/core';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  selected: string = 'Libros';
  navegacion: Navegacion[] = [
    { id: 1, nombre: 'Libros', link: "/libros" },
    { id: 2, nombre: 'About', link: "/about" },
  ];

  select(nombre: string) {
    this.selected = nombre;
  }

}

interface Navegacion {
  id: number;
  nombre: string;
  link: string;
}
