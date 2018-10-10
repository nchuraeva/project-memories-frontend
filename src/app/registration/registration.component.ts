
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../objects/User";
import {RegistrationValidator} from "../objects/RegistrationValidator";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup:FormGroup;
  passwordFormGroup:FormGroup;


  constructor(private router:Router, private authService:AuthService, private formBuilder:FormBuilder) {
    this.createForms();
  }

  ngOnInit() {}

  onRegistration() {
    let newUser = new User(
      this.registrationFormGroup.value.username,
      this.passwordFormGroup.value.password,
      this.registrationFormGroup.value.email
    );
    this.authService.registerNewUser(newUser).subscribe(response => {
      let message = "";
      if (response.body === true) {
        message = "Пользователь успешно добавлен!";
      } else {
        message = response.error.toString();
      }
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 2000);
    }, error => {
      console.log(error);
    })
  }

  private createForms() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      password2: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
  }
}

