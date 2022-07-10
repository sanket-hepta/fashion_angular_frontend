import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get(`${environment.apiURL}products/index`);
  }

  getProduct(slug:any):Observable<any>{
    return this.http.get(`${environment.apiURL}products/get/${slug}`);
  }
}
