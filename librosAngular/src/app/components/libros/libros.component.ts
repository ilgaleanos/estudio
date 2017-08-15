import { Component } from '@angular/core';
import { Libro } from './libro';
import { LibroService } from './libro.service';

var qs = require('qs');

@Component({
  selector: 'app-root',
  templateUrl: './libros.component.html',
  styleUrls: ['./all.components.css']
})
export class LibrosComponent {
  errorMessage: string;
  libros: Libro[];
  libroForm: Libro = new Libro({ Nombre: '', Fecha: '' });

  constructor(
    private LibroService: LibroService
  ) { }

  ngOnInit(): void {
    this.LibroService.getLibros()
      .subscribe(
      data => this.libros = data.Libros,
      error => this.errorMessage = <any>error);
  }

  onSubmit(event) {
    this.LibroService.addLibro(this.libroForm)
      .subscribe(
      data => {
        this.libros.push(new Libro(data.Libro));
        console.log(JSON.stringify(this.libros));
      },
      error => console.log(error)
      );
  }

  delete(libro: Libro) {
    this.LibroService.deleteLibro(libro)
      .subscribe(
      data => {
        for (let i = 0; i < this.libros.length; i++) {
          if (this.libros[i].Id == libro.Id) {
            this.libros.splice(i, 1);
          }
        }
      },
      error => console.log(error)
      );
  }
}
