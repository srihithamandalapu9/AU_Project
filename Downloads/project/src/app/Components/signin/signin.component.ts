import { Router } from '@angular/router';
import { SignInService } from './../../sign-in.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userForm!: FormGroup;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;
  user!: ' ';
  Userdata!: {};

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    http: HttpClient,
    private signinservice: SignInService,
    private router: Router // private myService: MyService
  ) { }

  CallSignIn() {
    console.log(this.userForm.value);

    this.signinservice.SignInUser(this.userForm.value).subscribe((response) => {

      console.log(response);
      console.log(response.id);
      this.signinservice.emitUserId<Number>(response.id);
      if (response.isadmin === "Yes") {
        this.router.navigateByUrl("admin-page");
      }
      else if (this.userForm.value.emailId === response.emailId && this.userForm.value.password === response.password) {
        this.router.navigateByUrl(`/video-category/${response.id}`);
      }

      else if(this.isLoggedin){
        this.router.navigateByUrl(`/video-category/${response.id}`);
      }
      else {
        Swal.fire('Invalid Email or Password !', 'error');
      }
    });


  }
  get emailId() {
    return this.userForm.get('emailId');
  }

  get password() {
    return this.userForm.get('password');
  }
  ngOnInit() {
    this.userForm = new FormGroup({
      emailId: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });

    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      this.Userdata = [
        {
          firstName: this.socialUser.firstName,
          lastName: this.socialUser.lastName,
          emailId: this.socialUser.email,
        },
      ];
      console.log(this.Userdata);
      // this.signinservice.emitUserId<Number>();

      //this.router.navigateByUrl('/video-category');
    });

    this.signinservice.SignInUser(this.Userdata).subscribe((response) => {

      console.log("User Info", response);

    });
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
