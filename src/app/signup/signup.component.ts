import { Component, OnInit } from '@angular/core';
import {ApisignService} from './apisign.service';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signdone=false;

  constructor (private router :Router,private http:HttpClient,private jsoner: ApisignService){}

  ngOnInit(): void {
  
  }

   signupForm = new FormGroup({
      fullname:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      mobile:new FormControl('',[Validators.required])
   })
   get email(){return this.signupForm.get('email')}
   get password(){return this.signupForm.get('password')}
   get fullname(){return this.signupForm.get('fullname')}
   get mobile(){return this.signupForm.get('mobile')}   

  

  signUp(){

    const http$ = this.http.post<any>('http://localhost:3000/api/user/register',{
      "name":this.signupForm.value["fullname"],
      "email":this.signupForm.value["email"],
      "password":this.signupForm.value["password"]
    });
    http$.subscribe( res => {
        this.signdone=res.chk;
        console.log('results in '+res.chk);
        
    },
    error => {
      alert('Email already Exists ');
    },

    () => {
      if(this.signdone){
        alert("signup Successfull ");
        this.signupForm.reset();
        //this.signdone=true;
        this.router.navigate(['login']);
      }
      else{
        alert('Not able to sign in');
      }
    }
    );
    
    //post
  }
  

}
