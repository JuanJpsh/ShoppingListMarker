import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentialsForm!: FormGroup;
  correctCredentials!: boolean;

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
    const controlForm = this.credentialsForm.get(contolName);
    if (!controlForm) throw new Error(`contol name ${contolName} not found in the formGoup`)
    if (controlForm.getError('required'))
      return "Este campo es obligatorio"
    else if (controlForm.getError("minlength"))
      return "Este campo debe tener al menos 8 carácteres"
    else if (controlForm.getError("maxlength"))
      return "Este campo debe tener maximo 30 carácteres"
    else if (controlForm.getError("incorrectCredentials"))
      return ""
    return ""
  }

  submit() {
    if (
      this.credentialsForm.invalid
      && !this.credentialsForm.get("username")?.hasError("incorrectCredentials")
      && !this.credentialsForm.get("password")?.hasError("incorrectCredentials")
    )
      return
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
