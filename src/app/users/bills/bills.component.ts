import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(private http:HttpClient) { }
  
  token=String(localStorage.getItem('token'));
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'auth-token':this.token
    })
  };

  icon:string;
  name:string;
  amount:Number;
  bills:any;

  ngOnInit(): void {
    const http$ = this.http.get<any>('http://localhost:3000/api/user/outcome',
      this.httpOptions
    );
    http$.subscribe( res => {
        this.bills=res;
    },
    error => {
      alert('already Exists ');
    },

    () => {
      
    }
    );

  }

  onAdd(){
    const http$ = this.http.post<any>('http://localhost:3000/api/user/outcome',
    {
      "icon":this.icon,
      "name":this.name,
      "amount":this.amount
     
    },this.httpOptions);
    http$.subscribe( res => {
        //this.signdone=res.chk;
        console.log('results in ');  
    },
    error => {
      alert('already Exists ');
    },

    () => {
      alert('Added');
      location.reload();
    }
    );

   
  }
  
  onDelete(_id:string){
    const http$ = this.http.delete<any>('http://localhost:3000/api/user/outcome',
    {
      body:{
        id:_id
      }
    }
    );
    http$.subscribe( res => {
        this.bills=res;
    },
    error => {
      alert('already deleted ');
    },

    () => {
      
      alert('deleted');
      location.reload();
    }
    );
  }

 
  
}
