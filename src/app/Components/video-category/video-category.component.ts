import { Component, OnInit } from '@angular/core';
//import { CommentServiceService } from '../comment-service.service';
@Component({
  selector:'app-video-category',
  templateUrl: './video-category.component.html',
  styleUrls: ['./video-category.component.css']
})
export class VideoCategoryComponent implements OnInit {

  public categoryOnFocus = ""
  //constructor(private serviceObj: CommentServiceService) { }

  ngOnInit(): void {
    // this.serviceObj.on<string>().subscribe(
    //   (data: string)=> {
    //     this.categoryOnFocus = data;
    //     console.log("in video cat",this.categoryOnFocus);
    //   }
    // )
  }
  
  count =[1,2,3,4,5]
  url = 'https://firebasestorage.googleapis.com/v0/b/videodisplay483.appspot.com/o/8297pb0ued?alt=media&token=aefee8fb-8138-40cd-b014-097352f2ac4e';

}
