import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../Model/Comment';
import { ActivatedRoute } from '@angular/router';
import { PlayVideoService } from '../../play-video.service';
import { Video } from '../Model/Video';
import { GetVideosService } from 'src/app/get-videos.service';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',

  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  numberOfLikes: number = 0;
  comments: Comment[] = [];
  userId?:number;

  userForm: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });
  videoIdPlaying: number = 11;
  videoObject!: Video | undefined;

  constructor(private router: Router,
    private _Activatedroute: ActivatedRoute,
    private getVideoService: GetVideosService,
    private playVideoService : PlayVideoService) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.videoIdPlaying = params.get('videoId') as unknown as number; 
      this.userId = params.get('userId') as unknown as number; 
    });
      this.playVideoService.playVideo(this.videoIdPlaying).subscribe((data: Video) => {
        this.videoObject = data;
        //console.log(this.videoObject.comment[0]);
        this.numberOfLikes=this.videoObject.like.length;
        /*this.videoObject.comment.forEach((data)=>{
          console.log(data.commentDesc);
          this.comments.push(data);
        });*/
        console.log(this.videoObject.comment);
        this.comments=this.videoObject.comment;
        //console.log(this.comments);
        
  });
  //const downloadURL = this.videoObject?.videoLink;
  }
  

  likeButtonClick() {
    this.getVideoService.likeVideo(this.videoIdPlaying,this.userId).subscribe((data: number) => {
      console.log("liked video");
      this.numberOfLikes=data;
    
});
  }
  //replace with video.VideoLink
  
  addToComments() {
    /*const newComment: commentDetails = {
      name: 'anonymous',
      comment: this.userForm.get('comment').value,
    };
    this.commentSerive.addComment(newComment);
  }*/
    //do post call for adding comment
  }
}
