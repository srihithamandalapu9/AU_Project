import { SignInService } from './../../sign-in.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService,GoogleLoginProvider,SocialUser} from 'angularx-social-login';
import { FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';

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
    http :HttpClient,private signinservice:SignInService
    
  ) {}

  CallSignIn() {
      console.log(typeof(this.userForm.value)); 
      this.signinservice.SignInUser(this.userForm.value).subscribe((response)=>{
      console.log(response);
      console.log("User Signed In");
  });
  }
  get emailId(){
    return this.userForm.get("emailId");
  }

  get password(){
    return this.userForm.get("password");
  }
  ngOnInit() {
      this.userForm= new FormGroup({
      emailId: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',Validators.required),
  });


    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = user != null;
    //   console.log(typeof(this.socialUser));
    //   this.Userdata = [
    //     {firstName :this.socialUser.firstName,lastName:this.socialUser.lastName,Email:this.socialUser.email}
    //   ]
    //   console.log(typeof(this.Userdata));
    //   // console.log(this.socialUser.email);
    //   // console.log(this.socialUser.firstName);
    //   // console.log(this.socialUser.lastName);
    // });
  

  loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      this.Userdata = [
        {firstName :this.socialUser.firstName,lastName:this.socialUser.lastName,emailId:this.socialUser.email}
      ]
      console.log(this.Userdata);

  });
}

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
