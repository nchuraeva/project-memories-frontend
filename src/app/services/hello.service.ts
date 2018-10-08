import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";

@Injectable()
export class HelloService {

  constructor(private http: HttpClient) { }

  getHello(){
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Basic " + btoa(environment.clientId + ":" + environment.clientSecret)
    });

    return this.http.get("http://localhost:8080/api/home", { headers: headers } );
  }

}
