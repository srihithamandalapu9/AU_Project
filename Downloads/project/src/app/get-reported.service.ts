import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetReportedService {

  constructor(private http : HttpClient) { }

  getReportedVideos():Observable<any>{
    return this.http.get("http://localhost:8080/reportedVideos");
  }

  getReportedComments():Observable<any>{
    return this.http.get("http://localhost:8080/reportedComments");
  }

  getUnApprovedVideos():Observable<any>{
    return this.http.get("http://localhost:8080/UnapprovedVideos");
  }
}
