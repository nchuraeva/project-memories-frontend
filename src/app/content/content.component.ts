import { Component, OnInit } from '@angular/core';
import {DeskService} from "../services/desk.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private deskService: DeskService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      user = user["userName"];
    }

    this.deskService.getDefaultDesks(user).subscribe(desks => {
      alert(desks);
    });
  }
}
