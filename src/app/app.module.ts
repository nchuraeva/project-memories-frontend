import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HelloService} from "./services/hello.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";
import {AuthServiceGuard} from "./services/auth-service.guard";
import {RequestInterceptorService} from "./services/request-interceptor.service";
import { MainPageComponent } from './main-page/main-page.component';
import { ContentComponent } from './content/content.component';
import {DeskService} from "./services/desk.service";
import {RegistrationComponent} from "./registration/registration.component";
import { WaitTimerComponent } from './wait-timer/wait-timer.component';
import { SquareButtonComponent } from './square-button/square-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    MainPageComponent,
    ContentComponent,
    WaitTimerComponent,
    SquareButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HelloService,
    AuthService,
    DeskService,
    AuthServiceGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
