import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDone:boolean;
  tokens:string;
  name:string;
  constructor(private router:Router,private http:HttpClient) { }

  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  
  login(){
    const http$ = this.http.post<any>('http://localhost:3000/api/user/login',{
      "email":this.loginForm.value["email"],
      "password":this.loginForm.value["password"]
    });
    http$.subscribe( res => {
        this.loginDone=res.chk
        this.tokens=res.token;
        this.name=res.name;
          //console.log('done');
    },
    error => {
      alert('Invalid Credentials ');
    },

    () => {
      if(this.loginDone){
        alert("Login Successfull ");
        this.loginForm.reset();
        localStorage.setItem('token',this.tokens);
        localStorage.setItem('userType',this.name);
        this.router.navigate(['users/buddy']);
        //this.signdone=true;
        
      }
      else{
        alert('Invalid credentials');
      }
    }
    );
  }

  ngOnInit(): void {
    //delete all tokens
    //localStorage.clear();
  }

}
 