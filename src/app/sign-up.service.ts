import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http:HttpClient) { }
  SignUpUser(user:any):Observable<any>{
    return this.http.post("/Project/registeruser",JSON.stringify(user));
  }
}
