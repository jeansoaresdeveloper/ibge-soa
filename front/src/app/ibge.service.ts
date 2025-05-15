import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private readonly URL = 'https://servicodados.ibge.gov.br/api/v2/censos';

  constructor(private readonly client: HttpClient) {}

  findByNomes(nomes: string[]) {
    const query = nomes.join('|');
    return this.client.get(`${this.URL}/nomes/${query}`);
  }

  findUfs(): Observable<any[]> {
    return this.client.get<any>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );
  }

  findMunicipiosByUF(id: number): Observable<any[]> {
    return this.client.get<any>(
      `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
    );
  }
}
