import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public userId = new BehaviorSubject('');
  constructor( private http:HttpClient) { }

  SignInUser(user :any):Observable<any>{
    return this.http.post("http://localhost:8080/login",user);
  }
  emitUserId<T>(data : string ){
    this.userId.next(data);
  }

  fetchUserId<T> () :  Observable<String> {
    return this.userId.asObservable();
  } 
}

