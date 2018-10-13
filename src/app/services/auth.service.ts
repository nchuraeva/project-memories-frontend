import { Injectable } from '@angular/core';
import {User} from "../objects/User";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuResponse} from "../objects/AuResponse";
import { Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {ResponseBoolean} from "../objects/ResponseBoolean";

@Injectable()
export class AuthService {

  private authUrl = environment.oauthServerUrl;
  private restApiUrl = environment.restApiUrl;
  private user;
  private accessToken;
  private refreshToken;

  constructor(private http:HttpClient, private router:Router) {
    this.refreshAuthData();
  }


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

    this.http.post<AuResponse>(url, body.toString(), httpOptions)
      .subscribe(response => {
        this.doAuth(response);
        this.router.navigateByUrl("");
      }, (error) => {
        console.log('error in', error);
      });

  }

  doAuth(response: AuResponse) {
    localStorage.setItem('currentUser', JSON.stringify({
      userName: response.username,
      token: response.access_token,
      refresh_token: response.refresh_token,
      roles: response.roles
    }));
    this.refreshAuthData();
  }

  private refreshAuthData() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.user = user["userName"];
      // В oauth
      this.accessToken = user["token"];
      this.refreshToken = user["refresh_token"];
    }
  }

  isAuth() {
    return this.accessToken != null;
  }

  logout() {
    let logoutUrl = this.authUrl + "/revoke-token";
    this.http.get<Object>(logoutUrl).subscribe( response => {
      localStorage.removeItem('currentUser');
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.router.navigateByUrl("/login");
    });
  }

  getAuthToken() {
    return this.accessToken;
  }

  doRefreshToken() {
    let url = this.authUrl;
    const body = new URLSearchParams();
    body.set('refresh_token', this.refreshToken);
    body.set('grant_type', 'refresh_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + btoa(environment.clientId+":"+environment.clientSecret)
      })
    };
    return this.http.post<AuResponse>(url, body.toString(), httpOptions);

  }

  registerNewUser(newUser) : Observable<ResponseBoolean>{
    let url = this.restApiUrl + "/register";
    const headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Basic " + btoa(environment.clientId + ":" + environment.clientSecret)
    });


    return this.http.put<ResponseBoolean>(url, JSON.stringify(newUser), {
      headers: headers
    });

  }
}
