import { Component, OnInit } from '@angular/core';
import {HelloService} from "../services/hello.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  greetings: String;

  constructor(private helloService:HelloService) {
    this.greetings = "Hello";
  }

  ngOnInit() {
    this.helloService.getHello().subscribe(res => {
      debugger;
      this.greetings = res['str'];
    });
  }

}
