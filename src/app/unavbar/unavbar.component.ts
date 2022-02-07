import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-unavbar',
  templateUrl: './unavbar.component.html',
  styleUrls: ['./unavbar.component.css']
})
export class UnavbarComponent implements OnInit{

  username=String(localStorage.getItem('userType'));

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private auth :AuthService,private router:Router ,private breakpointObserver: BreakpointObserver) {}
      ngOnInit() {
      }
        isLogged() {
          return this.auth.IsLoggedIn();
        }
        logout(){
          localStorage.clear();
          this.router.navigate(['login']);
        }
}
