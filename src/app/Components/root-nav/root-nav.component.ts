import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryPassingService } from '../../category-passing.service';

@Component({
  selector: 'app-root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css'],
})
export class RootNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private serviceObj: CategoryPassingService
  ) {}

  categoryPresent = 'All Category';
  category_list = [
    'All Category',
    'Java',
    'Angular',
    'Maven',
    'Spring Boot',
    'NoSQL',
    'Git',
    'React Native',
    'Junit'
  ];

  sendCategory(name: string) {
    console.log('in root nav', name);
    this.categoryPresent = name;
    this.serviceObj.emit<string>(name);
  }
}
