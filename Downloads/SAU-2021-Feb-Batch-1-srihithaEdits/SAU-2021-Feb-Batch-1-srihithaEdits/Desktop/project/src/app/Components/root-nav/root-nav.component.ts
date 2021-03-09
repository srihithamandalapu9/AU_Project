import { SignInService } from './../../sign-in.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryPassingService } from '../../category-passing.service';
import { Router } from '@angular/router';
import { Category } from '../Model/Category';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css'],
})
export class RootNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private serviceObj: CategoryPassingService,
    private router: Router,
    private signinserviceobj: SignInService
  ) {}

  categoryPresent = 'All Category';
  userId!: Number;
  category_list!: Array<Category>;

  // 'All Category',
  //   'Java',
  //   'Angular',
  //   'Maven',
  //   'Spring Boot',
  //   'NoSQL',
  //   'Git',
  //   'React Native',
  //   'Junit',

  sendCategory(name: string) {
    console.log('in root nav', name);
    this.categoryPresent = name;
    this.serviceObj.emit<string>(name);
    this.router.navigateByUrl('/video-category');
  }
  // navigateToAddVideo(){
  //   this.userId = this.signinserviceobj.fetchUserId;
  // }

  ngOnInit() {
    this.serviceObj.getAllCategory().subscribe((data: Array<Category>) => {
      this.category_list = data;
    });
  }
}