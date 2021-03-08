import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './Components/Model/Video';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<Array<Video>> {
    return this.http.get<Array<Video>>('http://localhost:8080/getAllVids');
  }

  videoId!:string;
  userId!:string;

  likeVideo(videoId: any,userId: any):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/like/${videoId}/${userId}`);
  }
  

}
