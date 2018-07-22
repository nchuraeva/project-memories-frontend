import { Injectable } from '@angular/core';
import {User} from "../objects/User";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AutResponse} from "../objects/AutResponse";
import { Router} from '@angular/router';

@Injectable()
export class AuthService {

  private authUrl = environment.oauthServerUrl;
  private user;
  private accessToken;
  private refreshToken;

  constructor(private http:HttpClient, private router:Router) { }


  authenticate(user: User) {

    let url = this.authUrl + "/oauth/token";

    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('grant_type', "password");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + btoa(environment.clientId+":"+environment.clientSecret)
      })
    };

    this.http.post<AutResponse>(url, body.toString(), httpOptions)
      .subscribe(response => {
        this.doAuth(response);
        this.router.navigate(['/hello']);
      }, (error) => {
        //TODO: отображение ошибки
        console.log('error in', error);
      });

    this.refreshAuthData();

  }

  private doAuth(response: AutResponse) {
    debugger;
    localStorage.setItem('currentUser', JSON.stringify({
      userName: response.username,
      token: response.access_token,
      refresh_token: response.refresh_token,
      roles: response.roles
    }));
  }

  private refreshAuthData() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.user = user["userName"];
      this.accessToken = user["token"];
      this.refreshToken = user["refresh_token"];
    }
  }

  isAuth() {
    return this.accessToken != null;
  }
}
