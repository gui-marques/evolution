import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string){


    cep = cep.replace(/\D/g, '');

    //verifica se o campo tem o valor do cep informado
    if (cep != "") {
      var validcep = /^[0-9]{8}$/;
      if(validcep.test(cep)) {


       return this.http.get(`//viacep.com.br/ws/${cep}/json`);


      }
    }
    return of({});

  }
}
