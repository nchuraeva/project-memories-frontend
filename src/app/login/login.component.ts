import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../objects/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User=null;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.user = new User("", "", "");
  }

  onSubmit() {
    this.authService.authenticate(this.user);
  }

  onRegistration() {
    this.router.navigateByUrl("/registration");
  }
}
