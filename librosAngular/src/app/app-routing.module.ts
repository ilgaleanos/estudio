import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibrosComponent }   from './components/libros/libros.component';
import { NotFound }   from './components/notFound.component';

const routes: Routes = [
  { path: '', component: LibrosComponent },
  { path: 'libros', component: LibrosComponent },
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
