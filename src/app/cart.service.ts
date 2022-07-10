import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCartData():Observable<any>{
    let sessionID = localStorage.getItem('sessionID');
    return this.http.get(`${environment.apiURL}cart/get/?session_id=${sessionID}`);
  }

  addToCart(data:any):Observable<any>{

    if (!localStorage.getItem('sessionID')) {
      localStorage.setItem('sessionID', Date.now().toString(36) + Math.random().toString(36).substr(2));
    }

    data.session_id = localStorage.getItem('sessionID');
    

    return this.http.post(`${environment.apiURL}cart/add`, data);
  }

  removeFromCart(id:string):Observable<any>{
    return this.http.delete(`${environment.apiURL}cart/remove/${id}`);
  }
}
