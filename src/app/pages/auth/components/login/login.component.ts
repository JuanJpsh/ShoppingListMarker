import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dictionary } from 'src/app/core/models/dictionary';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentialsForm!: FormGroup;
  correctCredentials!: boolean;
  errorMessages: Dictionary = {
    required: "Este campo es obligatorio",
    minlength: "Este campo debe tener al menos 8 carácteres",
    maxlength: "Este campo debe tener maximo 30 carácteres",
    incorrectCredentials: ""
  }

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private snackBarSvc: MatSnackBar
  ) { }

  ngOnInit() {
    this.credentialsForm = this.initCredentialsForm();
    this.correctCredentials = true
  }

  getErrorMessage(contolName: string) {
    const controlError = this.credentialsForm.get(contolName)?.errors
    if (!controlError) return ''
    const error = Object.keys(controlError)[0]
    return this.errorMessages[error]
  }

  submit() {
    if (
      this.credentialsForm.invalid
      && !this.credentialsForm.get("username")?.hasError("incorrectCredentials")
      && !this.credentialsForm.get("password")?.hasError("incorrectCredentials")
    ) return
    this.authSvc.login(this.credentialsForm.value).subscribe((resp) => {
      if (resp) {
        this.snackBarSvc.dismiss();
        this.router.navigate(['dashboard', 'home'])
      }
      else {
        this.correctCredentials = false;
        this.credentialsForm.get("username")?.setErrors({ incorrectCredentials: true })
        this.credentialsForm.get("password")?.setErrors({ incorrectCredentials: true })
        this.snackBarSvc.open(
          'Credenciales invalidas, Intentelo nuevamente',
          undefined,
          {
            duration: 5000
          }
        )
      }
    })
  }

  private initCredentialsForm() {
    return new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])
    })
  }
}
