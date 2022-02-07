import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisignService {

  constructor(private http: HttpClient) { }

    getrec(){
      return this.http.get("http://localhost:3000/api/posts");
    }


}
