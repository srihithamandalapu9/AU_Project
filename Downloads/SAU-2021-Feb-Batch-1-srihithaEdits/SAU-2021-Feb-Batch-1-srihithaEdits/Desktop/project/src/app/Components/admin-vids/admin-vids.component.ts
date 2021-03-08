import { ReportedVideos } from './../Model/ReportedVideos';
import { Video } from './../Model/Video';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetReportedService } from 'src/app/get-reported.service';
import { CategoryPassingService } from 'src/app/category-passing.service';
import { UnApprovedVideos } from '../Model/UnApprovedVideos';
import { ReportedComments } from '../Model/ReportedComments';

@Component({
  selector: 'app-admin-vids',
  templateUrl: './admin-vids.component.html',
  styleUrls: ['./admin-vids.component.css'],
})
export class AdminVidsComponent implements OnInit {
  @Input()
  reportedVideos!: Array<ReportedVideos>;
  @Input()
  reportedComments!: Array<ReportedComments>;
  @Input()
  unApprovedVideos!: Array<UnApprovedVideos>;
  @Input()
  clickedOn!: string;
  @Input()
  lengthOfreportedComments!:number;
  @Input()
  lengthOfreportedVideos!:number;
  @Input()
  lengthOfunApprovedVideos!:number;
  
  
  // reportedComStat = [
  //   {
  //     firstName: 'Rashi',
  //     lastName: 'Chhajer',
  //     commentId: 201,
  //     commentDesc: 'This is comment 1',
  //     videoId: 101,

  //     videoLink:'https://firebasestorage.googleapis.com/v0/b/videodisplay483.appspot.com/o/8297pb0ued?alt=media&token=aefee8fb-8138-40cd-b014-097352f2ac4e',
  //     videoTitle: 'Angular',
  //   },
  //   {
  //     firstName: 'Abc',
  //     lastName: 'Chhajer',
  //     commentId: 201,
  //     commentDesc: 'This is comment 1',
  //     videoId: 101,
  //     videoLink:
  //       'https://firebasestorage.googleapis.com/v0/b/videodisplay483.appspot.com/o/8297pb0ued?alt=media&token=aefee8fb-8138-40cd-b014-097352f2ac4e',
  //     videoTitle: 'Angular',
  //   },
  // ];

  constructor() {}

  ngOnInit() {
    console.log(this.reportedComments, this.reportedVideos);
  }
}
