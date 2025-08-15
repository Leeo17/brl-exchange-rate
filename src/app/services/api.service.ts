import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string =
    'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';

  constructor(private http: HttpClient) {}

  getCurrentExchangeRate(currencyCode: string) {
    const params = new HttpParams()
      .set('apiKey', 'RVZG0GHEV2KORLNA')
      .set('from_symbol', currencyCode)
      .set('to_symbol', 'BRL');
    return this.http.get<any>(this.baseUrl + '/currentExchangeRate', {
      params,
    });
  }

  getDailyExchangeRate(currencyCode: string) {
    const params = new HttpParams()
      .set('apiKey', 'RVZG0GHEV2KORLNA')
      .set('from_symbol', currencyCode)
      .set('to_symbol', 'BRL');
    return this.http.get<any>(this.baseUrl + '/dailyExchangeRate', {
      params,
    });
  }
}
