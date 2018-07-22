import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RequestOptions} from "@angular/http";

@Injectable()
export class HelloService {

  constructor(private http: HttpClient) { }

  getHello(){
    debugger;
    let options = new HttpParams();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
    });

    return this.http.get("http://localhost:8082/api/home", { headers: headers } );
  }

}
