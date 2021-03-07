import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './Components/Model/Comment';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  constructor(private http: HttpClient) {}

  /*getComments(): Observable<Array<Video>> {
    return this.http.get<Array<Video>>('http://localhost:8080/getAllVids');
  }*/

}
