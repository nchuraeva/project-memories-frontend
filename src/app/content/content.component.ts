import { Component, OnInit } from '@angular/core';
import {DeskService} from "../services/desk.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private deskService: DeskService) { }

  ngOnInit() { }
}
