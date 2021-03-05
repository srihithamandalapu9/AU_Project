import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor( private http:HttpClient) { }
  SignInUser(user :any):Observable<any>{
    return this.http.post("/AUProject/signin",JSON.stringify(user));
  }

  
}
