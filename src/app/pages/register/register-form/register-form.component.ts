import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notEqualPassword } from '../validators/password-confirmation';
import { Dictionary } from 'src/app/core/models/dictionary';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  userDataForm!: FormGroup;
  errorMessages: Dictionary = {
    required: "Este campo es obligatorio",
    notEqualPassword: "La contraseña no coincide",
    minlength: "Este campo debe tener al menos 8 carácteres",
    maxlength: "Este campo debe tener maximo 30 carácteres",
    existUsername: "Este nombre de usuario ya existe"
  }

  constructor(
    private registerSvc: RegisterService,
    private router: Router,
    private snackBarSvc: MatSnackBar
  ) { }

  ngOnInit() {
    this.userDataForm = this.inituserDataForm();
  }

  getErrorMessage(contolName: string) {
    const controlError = this.userDataForm.get(contolName)?.errors
    if (!controlError) return ''
    const error = Object.keys(controlError)[0]
    return this.errorMessages[error]
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
    }).subscribe(response => this.handleLoginResponse(response))
  }

  private handleLoginResponse($event: boolean) {
    if ($event) {
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
