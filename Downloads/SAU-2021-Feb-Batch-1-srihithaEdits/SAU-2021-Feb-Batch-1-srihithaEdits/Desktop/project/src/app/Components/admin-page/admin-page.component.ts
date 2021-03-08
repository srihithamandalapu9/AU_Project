import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryPassingService } from 'src/app/category-passing.service';
import { GetReportedService } from 'src/app/get-reported.service';
import { GetVideosService } from 'src/app/get-videos.service';
import { Category } from '../Model/Category';
import { UnApprovedVideos } from '../Model/UnApprovedVideos';
import { Video } from '../Model/Video';
import {ReportedVideos } from '../Model/ReportedVideos';
import { ReportedComments } from '../Model/ReportedComments';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  clicked = false;
  clickedOn = "home";
  length!: boolean;
  categoryVideos!: Array<Video>; //Make a call to fetch videos
  category_list!: Array<Category>;
  reportedVideos!: Array<ReportedVideos>;
  reportedComments!: Array<ReportedComments>;
  unApprovedVideos!: Array<UnApprovedVideos>;
  allVideos!: Array<Video>;
  lengthOfreportedComments!:number;
  lengthOfreportedVideos!: number;
  lengthOfunApprovedVideos!:number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private categoryserviceobj: CategoryPassingService,
    private reported: GetReportedService,
    private getVideos:GetVideosService
  ) {}
  toggleClick = () => {
    this.clicked = !this.clicked;
  };

  displayCatVideos(categoryId: any) {
    this.categoryserviceobj
      .getVideosByCategory(categoryId)
      .subscribe((catVideos) => {
        this.categoryVideos = catVideos;

        if (this.categoryVideos.length > 0) {
          this.length = true;
        }
      });
  }
  logout() {
    this.router.navigateByUrl('/');
  }

  
  displayReportedVideos() {
    this.reported.getReportedVideos().subscribe((reportedVids) => {
      this.reportedVideos = reportedVids;

      this.lengthOfreportedVideos = reportedVids.length;
    });
  }
  displayReportedComments() {
    this.reported.getReportedComments().subscribe((reportedCommentsData) => {
      this.reportedComments = reportedCommentsData;
      this.lengthOfreportedComments= this.reportedComments.length;
      console.log(this.reportedComments);
    });
  }

  displayUnApprovedVideos() {
    this.reported.getUnApprovedVideos().subscribe((unApprovedVideoData) => {
      this.unApprovedVideos = unApprovedVideoData;
      this.lengthOfunApprovedVideos = unApprovedVideoData.length;
      console.log("in unapproved..");
      console.log( this.unApprovedVideos);
    });
  }

  displayAllVideos(){
    this.getVideos.getAllVideos().subscribe((AllVideos)=>{
      this.allVideos = AllVideos;
    }
    )
  }

  changeView(view: string): void {
    this.clickedOn = view
  }

  ngOnInit(): void {
    this.categoryserviceobj.getAllCategory().subscribe((data: Array<Category>) => {
      this.category_list = data;
    });
    this.displayAllVideos()
    this.displayReportedComments();
    this.displayReportedVideos();
    this.displayUnApprovedVideos();
  }

}
