import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {AuthServiceGuard} from "./services/auth-service.guard";



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'hello',
    component: HeaderComponent,
    canActivate: [AuthServiceGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
