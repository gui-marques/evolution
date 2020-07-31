import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../models/estado-br.model';
import { Injectable } from '@angular/core';
import { Cidade } from '../models/cidade';


@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) {}



  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');

    }

  getCidades(idEstado: number) {

    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: Cidade[]) => cidades.filter (c => c.estado == idEstado))
    );

  }
  }
