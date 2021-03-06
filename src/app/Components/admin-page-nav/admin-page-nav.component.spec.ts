import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageNavComponent } from './admin-page-nav.component';

describe('AdminPageNavComponent', () => {
  let component: AdminPageNavComponent;
  let fixture: ComponentFixture<AdminPageNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
