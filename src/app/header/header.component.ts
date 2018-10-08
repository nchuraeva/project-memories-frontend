import { Component, OnInit } from '@angular/core';
import {HelloService} from "../services/hello.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  greetings: String;
  private currentUser: String;

  constructor(private helloService:HelloService, private authService:AuthService) {
    this.greetings = "Hello";
    this.helloService.getHello().subscribe(res => {
      this.greetings = res['str'];
    });
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.currentUser = user["userName"];
    }
  }

  logout() {
    this.authService.logout();
  }
}
