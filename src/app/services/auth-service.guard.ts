import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthServiceGuard implements CanActivate {

  constructor(protected router:Router, protected authService:AuthService) {
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
    debugger;
    if (this.authService.isAuth()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
