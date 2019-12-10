import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global/global.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient, private global: GlobalService) { }


  /*
  Cargar productos
  */
 GetDBQueryOperation(operationType: string, routeFile: string, SubQuery?: string, queryId?: number | string) {
   let URL_REQUEST;
   if (queryId) {
      URL_REQUEST = `${environment.REST}/${routeFile}.php?operationType=${operationType}&${SubQuery}=${queryId}`;
    } else {
      URL_REQUEST = `${environment.REST}/${routeFile}.php?operationType=${operationType}`;
    }
   return this._http.get(URL_REQUEST).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.global.OpenSnackBar('Operación fallida, inténtelo más tarde');
        return new Observable<string | boolean>();
      })
    );
 }
 GetDBQuerySort(operationType: string, routeFile: string, limit: number, offset: number = 0) {
  const URL_REQUEST = `${environment.REST}/${routeFile}?operationType=${operationType}&LIMIT=${limit}&offset=${offset}`;
  return this._http.get(URL_REQUEST).pipe(
     map((resp: any) => {
       return resp;
     }),
     catchError( (err: any)  => {
       console.error(err);
       this.global.OpenSnackBar('Operación fallida, inténtelo más tarde');
       return new Observable<string | boolean>();
     })
   );
}
}
