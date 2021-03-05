import { SignUpService } from './../../sign-up.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  

  userForm: FormGroup = new FormGroup({
    Firstname: new FormControl('',Validators.required),
    Lastname:new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
    Email:new FormControl(' ',Validators.required)
  });

  constructor(http:HttpClient,private signupservice: SignUpService) { }

  ngOnInit(): void {
  }

  CallSignUp(){
    
      console.log(this.userForm.value);
      this.signupservice.SignUpUser(this.userForm.value).subscribe((response)=>{
      console.log(response);
      console.log("User created")
    })

  }

}
