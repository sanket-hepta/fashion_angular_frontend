import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  createOrder(data:any):Observable<any>{
    data.session_id = localStorage.getItem('sessionID');
    return this.http.post(`${environment.apiURL}order/create`, data);
  }
}
