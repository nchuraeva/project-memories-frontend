import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
  HttpSentEvent, HttpUserEvent
} from "@angular/common/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/take";
import {AuthService} from "./auth.service";
import {AuResponse} from '../objects/AuResponse';


@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  static addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({setHeaders: {Authorization: 'Bearer ' + token}})
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    console.log(req);
    debugger;
    return next.handle(RequestInterceptorService.addToken(req, this.authService.getAuthToken()))
      .catch(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
          }
        } else {
          return Observable.throw(error);
        }
      });

  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.doRefreshToken()
        .switchMap((response: AuResponse) => {
          if (response) {
            this.authService.doAuth(response);
            this.tokenSubject.next(this.authService.getAuthToken());
            return next.handle(RequestInterceptorService.addToken(req, this.authService.getAuthToken()));
          }

          // If we don't get a new token, we are in trouble so logout.
          this.authService.logout();
          return Observable.throw({description: "can't refresh token"});
        })
        .catch((error) => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          this.authService.logout();
          return Observable.throw(error);
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(RequestInterceptorService.addToken(req, token));
        });
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      this.authService.logout();
    }

    return Observable.throw(error);
  }

}
