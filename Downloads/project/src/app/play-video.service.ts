import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './Components/Model/Video';

@Injectable({
  providedIn: 'root'
})
export class PlayVideoService {

  constructor(private http:HttpClient) { }

  playVideo(videoId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/play/${videoId}`);
  }
}
