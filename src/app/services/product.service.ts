import { product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  getListProduct(): Observable<{ listProducts: product[] }> {
    return this.http.get<{ listProducts: product[] }>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  saveProduct(producto: product): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`,producto);
  }

  getProduct(id:number): Observable<product>{
    return this.http.get<product>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  updateProduct(id:number, procto:product):Observable<void>{
    return  this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,procto);

  }
}
