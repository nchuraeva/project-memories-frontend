import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class HelloService {

  constructor(private http: HttpClient) { }

  getHello(){
    return this.http.get("http://localhost:8081/api/login");
  }

}
