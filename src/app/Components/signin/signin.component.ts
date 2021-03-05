import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

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

  CallSignIn() {
    console.log(typeof(this.userForm.value)); 
  }

  get Email(){
    return this.userForm.get("Email");
  }

  get Password(){
    return this.userForm.get("Password");
  }

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    
  ) {}


  ngOnInit() {
    this.userForm= new FormGroup({
    Email: new FormControl('',[Validators.email,Validators.required]),
    Password: new FormControl('',Validators.required),
  });


    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(typeof(this.socialUser));
      this.Userdata = [
        {firstName :this.socialUser.firstName,lastName:this.socialUser.lastName,Email:this.socialUser.email}
      ]
      console.log(typeof(this.Userdata));

      // console.log(this.socialUser.email);
      // console.log(this.socialUser.firstName);
      // console.log(this.socialUser.lastName);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
