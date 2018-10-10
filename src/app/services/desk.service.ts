import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {Desk} from "../objects/Desk";

@Injectable()
export class DeskService {

  constructor(private http:HttpClient) { }


  getDefaultDesks(username): Observable<Desk[]> {
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Basic " + btoa(environment.clientId + ":" + environment.clientSecret)
    });
    const params = new HttpParams().set("username", username);

    return this.http.get<Desk[]>("http://localhost:8080/desks", {headers: headers, params: params});
  }


}
