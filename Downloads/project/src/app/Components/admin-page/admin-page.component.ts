import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryPassingService } from 'src/app/category-passing.service';
import { GetReportedService } from 'src/app/get-reported.service';
import { Category } from '../Model/Category';
import { Video } from '../Model/Video';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  clicked = false;
  categoryVideos! : Array<Video>;//Make a call to fetch videos
  categoryName!: string;
  reportedVideos!: Array<Video>;
  reportedComments!: Array<Comment>;
  unApprovedVidoes!: Array<Video>;
  constructor(private http: HttpClient, private router: Router ,private categoryserviceobj :CategoryPassingService,
    private reported :GetReportedService) { }
  toggleClick = () => {
    this.clicked = !this.clicked;
  };
  logout() {
    this.router.navigateByUrl("/")
  }
  displayCatVideos(categoryId: any) {
    this.categoryserviceobj.getVideosByCategory(categoryId).subscribe((catVideos)=>{
      this.categoryVideos = catVideos;
    });
  }

  displayReportedVideos(){
    this.reported.getReportedVideos().subscribe((reportedVids)=>{
      this.reportedVideos = reportedVids;
    });
}
   displayReportedComments(){
    this.reported.getReportedComments().subscribe((reportedCommentsData)=>{
      this.reportedComments = reportedCommentsData;
    });
  }

  displayUnApprovedVideos(){
    this.reported.getUnApprovedVideos().subscribe((unApprovedVideoData)=>{
      this.unApprovedVidoes = unApprovedVideoData;
    })
  }
  ngOnInit(): void {
  }

}
