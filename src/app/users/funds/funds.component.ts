import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {

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
  type:string;
  amount:Number;
  funds:any;


  ngOnInit(): void {
    const http$ = this.http.get<any>('http://localhost:3000/api/user/income',
      this.httpOptions
    );
    http$.subscribe( res => {
        this.funds=res;
    },
    error => {
      alert('already Exists ');
    },

    () => {
      
    }
    );
  }

  onAdd(){
    const http$ = this.http.post<any>('http://localhost:3000/api/user/income',
    {
      "icon":this.icon,
      "name":this.name,
      "type":this.type,
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
    const http$ = this.http.delete<any>('http://localhost:3000/api/user/income',
    {
      body:{
        id:_id
      }
    }
    );
    http$.subscribe( res => {
        this.funds=res;
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
