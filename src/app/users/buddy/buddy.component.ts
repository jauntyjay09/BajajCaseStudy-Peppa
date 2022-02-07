import { Component, Input, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.component.html',
  styleUrls: ['./buddy.component.css']
})
export class BuddyComponent implements OnInit {

  username=String(localStorage.getItem('userType'));

  earn=0;
  em=0;
  mf=0;
  rf=0;
  sf=0;
  cvb=false;;

  billvalue=7000;
 
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
