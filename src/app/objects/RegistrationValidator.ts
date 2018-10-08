import {FormGroup} from '@angular/forms';

export class RegistrationValidator {
  static validate(formGroup:FormGroup) {
    let password = formGroup.controls.password.value;
    let repeatPassword = formGroup.controls.password2.value;

    if (repeatPassword.length <= 0) {
      return null;
    }

    if (repeatPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }

    return null;

  }
}
