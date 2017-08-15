import { Injectable }                                           from '@angular/core';
import { Headers, RequestOptions }              from '@angular/http';
import { Http, Response }                                  from '@angular/http';
import { Observable }                                         from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var qs = require('qs');

import { Libro } from './libro'


@Injectable() export class LibroService {

  private librosUrl = 'http://localhost:8080/libros/';  // URL to web API

  constructor(private http: Http) { }

  getLibros(): Observable<any> {
    return this.http.get(this.librosUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addLibro(libro: Libro): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.librosUrl, qs.stringify(libro), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteLibro(libro: Libro): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.librosUrl + libro.Id + '/', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
