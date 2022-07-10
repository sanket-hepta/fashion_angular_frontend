import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedInUser = false;
  public userID = '';

  constructor(private http:HttpClient) { 
    this.isLoggedInUser = false;
    this.userID = '';
  }

  signUp(data:any):Observable<any>{
    return this.http.post(`${environment.apiURL}auth/sign-up`, data);
  }

  signIn(data:any):Observable<any>{
    return this.http.post(`${environment.apiURL}auth/sign-in`, data);
  }

  profile(data:any):Observable<any>{
    return this.http.put(`${environment.apiURL}auth/update-user`, data);
  }

  getUser(id:string):Observable<any>{
    let uid = localStorage.getItem('userID');
    return this.http.get(`${environment.apiURL}auth/get-user/${uid}`);
  }

  isUserLoggedIn():boolean{
    if (localStorage.getItem('isLoggedInUser') == "true") {
      this.isLoggedInUser = true;
    }else{
      this.isLoggedInUser = false;
    }
    return this.isLoggedInUser;
  }

  logoutUser(): void{
    this.isLoggedInUser = false;
    localStorage.setItem('isLoggedInUser', "false");
    localStorage.setItem('userID', "");
  }

}
