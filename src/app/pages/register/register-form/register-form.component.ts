import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notEqualPassword } from '../validators/password-confirmation';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  userDataForm!: FormGroup;

  constructor(
    private registerSvc: RegisterService,
    private router: Router,
    private snackBarSvc: MatSnackBar
  ) { }

  ngOnInit() {
    this.userDataForm = this.inituserDataForm();
  }

  getErrorMessage(contolName: string) {
    const controlForm = this.userDataForm.get(contolName);
    if (!controlForm) throw new Error(`contol name ${contolName} not found in the formGoup`)

    if (controlForm.getError('required'))
      return "Este campo es obligatorio"
    else if (controlForm.getError('notEqualPassword'))
      return "La contraseña no coincide"
    else if (controlForm.getError("minlength"))
      return "Este campo debe tener al menos 8 carácteres"
    else if (controlForm.getError("maxlength"))
      return "Este campo debe tener maximo 30 carácteres"
    else if (controlForm.getError("existUsername"))
      return "Este nombre de usuario ya existe"
    return ""
  }

  submit() {
    if (
      this.userDataForm.invalid
      && !this.userDataForm.get("username")?.hasError("existUsername")
    )
      return
    const { fullname, username, password } = this.userDataForm.value
    this.registerSvc.register({
      fullname,
      username,
      password
    }).subscribe((resp) => {
      if (resp){
        this.snackBarSvc.dismiss();
        this.router.navigate(['home'])
      }
      else {
        this.userDataForm.get("username")?.setErrors({ existUsername: true })
        this.snackBarSvc.open(
          'Nombre de usuario ya existente, Intentelo con otro nuevamente',
          undefined,
          {
            duration: 5000
          }
        )
      }
    })
  }

  private inituserDataForm() {
    return new FormGroup({
      fullname: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]),
      passwordConfirmation: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])
    }, {
      validators: notEqualPassword()
    })
  }
}
