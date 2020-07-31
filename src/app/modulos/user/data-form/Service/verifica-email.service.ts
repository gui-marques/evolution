import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: typedef-whitespace
  // tslint:disable-next-line: whitespace
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: whitespace
  // tslint:disable-next-line: typedef-whitespace
  // tslint:disable-next-line: whitespace
  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')


    .pipe(
      delay(1700),
      map((dados: {emails: any[]}) => dados.emails),
     // tap(console.log),
      map((dados: {email: string}[]) => dados.filter(v => v.email === email)),
     // tap(console.log),
      map((dados: any[]) => dados.length > 0 ),
      // tslint:disable-next-line: comment-format
      //tap(console.log)
      );

  }
}
