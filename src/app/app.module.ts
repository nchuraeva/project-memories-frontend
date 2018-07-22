import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {HelloService} from "./services/hello.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth.service";
import {AuthServiceGuard} from "./services/auth-service.guard";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HelloService,
    AuthService,
    AuthServiceGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
