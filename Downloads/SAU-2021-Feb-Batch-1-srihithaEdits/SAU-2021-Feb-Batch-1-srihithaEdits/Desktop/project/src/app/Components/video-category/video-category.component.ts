import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetVideosService } from 'src/app/get-videos.service';
import { CategoryPassingService } from '../../category-passing.service';
import { Video } from '../Model/Video';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoCategoryComponent implements OnInit {
  categoryOnFocus = '';
  videos!: Array<Video>;
  userId!: number;

  constructor(private _Activatedroute: ActivatedRoute,
    private serviceObj: CategoryPassingService,
    private videoobj: GetVideosService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.userId = params.get('userId') as unknown as number; 
    });
    this.serviceObj.on<string>().subscribe((data) => {
      this.categoryOnFocus = data;
      console.log('in video cat', this.categoryOnFocus);
    });
    this.videoobj.getAllVideos().subscribe((data: Array<Video>) => {
    /*  data.forEach(function (value) {
      });*/ 
      this.videos = data;
      console.log(data);
    });
  }

  // url =
  //   'https://firebasestorage.googleapis.com/v0/b/videodisplay483.appspot.com/o/8297pb0ued?alt=media&token=aefee8fb-8138-40cd-b014-097352f2ac4e';

  // get value of getVideos call.
  listOfVideos = this.videoobj.getAllVideos();
  videoDisplay() {
    console.log("clicking")
    this.router.navigateByUrl('/view-video');
  }
}
