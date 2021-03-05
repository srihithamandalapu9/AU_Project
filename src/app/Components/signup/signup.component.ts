import { SignUpService } from './../../sign-up.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName:new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    emailId:new FormControl(' ',Validators.required)
  });

  constructor(http:HttpClient,private signupservice: SignUpService,private router: Router) { }

  ngOnInit(): void {
  }

  CallSignUp(){
    
      console.log(this.userForm.value);
      this.signupservice.SignUpUser(this.userForm.value).subscribe((response)=>{
      console.log(response);
      console.log("User created")
    });
    //this.router.navigateByUrl('/home-page');

  }

}
