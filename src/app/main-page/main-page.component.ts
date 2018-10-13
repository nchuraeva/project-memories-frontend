import { Component, OnInit } from '@angular/core';
import {DeskService} from "../services/desk.service";
import {Desk} from "../objects/Desk";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private deskService: DeskService) { }

  desks:Desk[];

  ngOnInit() {
    this.desks = [];
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      user = user["userName"];
    }

    this.deskService.getDefaultDesks(user).subscribe(desks => {
      this.desks = desks;
    });
  }


}
