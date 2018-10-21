import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs/observable/timer";

@Component({
  selector: 'wait-timer',
  templateUrl: './wait-timer.component.html',
  styleUrls: ['./wait-timer.component.scss']
})
export class WaitTimerComponent implements OnInit {

  constructor() { }

  stringTime:string;
  remainingTime = 1200;

  ngOnInit() {
    timer(1000,1000).subscribe(() => {
      this.updateTimeString();
    });
  }

  updateTimeString() {
    this.remainingTime -= 1;
    let numberOfSeconds = this.remainingTime%60;
    let strSeconds = this.roundUp( numberOfSeconds);
    let minutes = (this.remainingTime - numberOfSeconds)/60;
    this.stringTime = `${minutes}:${strSeconds}`

  }
  roundUp(num: number): string{
    if(num < 10) {
      return "0" + num;
    }
    return num.toString();
  }

}
