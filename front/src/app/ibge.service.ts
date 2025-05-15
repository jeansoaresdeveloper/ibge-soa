import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private readonly URL = 'https://servicodados.ibge.gov.br/api/v2/censos';
  private readonly URL_ESTADOS =
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private readonly LOCALIDADE =
    'https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=';

  constructor(private readonly client: HttpClient) {}

  findByNomes(nomes: string[]) {
    const query = nomes.join('|');
    return this.client.get(`${this.URL}/nomes/${query}`);
  }

  findUfs(): Observable<any[]> {
    return this.client.get<any>(this.URL_ESTADOS);
  }

  findMunicipiosByUF(id: number): Observable<any[]> {
    return this.client.get<any>(`${this.URL_ESTADOS}/${id}/municipios`);
  }

  findRankingById(id: number, decada: number): Observable<any[]> {
    return this.client.get<any>(`${this.LOCALIDADE}${id}&decada=${decada}`);
  }
}
