import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dictionary } from 'src/app/core/models/dictionary';

@Component({
  selector: 'app-add-update-market-dialog',
  templateUrl: './add-update-market-dialog.component.html',
  styleUrls: ['./add-update-market-dialog.component.scss']
})
export class AddUpdateMarketDialogComponent implements OnInit {
  nameControl!: FormControl;
  dialogTitle!: string;
  errorMessages: Dictionary = {
    required: "Este campo es obligatorio",
    minlength: "Este campo debe tener al menos 3 carácteres",
    maxlength: "Este campo debe tener maximo 20 carácteres",
  }

  constructor(
    private dialogRef: MatDialogRef<AddUpdateMarketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private name: string
  ) { }

  ngOnInit(): void {
    if (this.name) this.dialogTitle = "Actualizar lista de mercado"
    else this.dialogTitle = "Nueva lista de mercado"
    this.nameControl = this.initNameControl();
  }

  getErrorMessage() {
    const controlError = this.nameControl.errors
    if (!controlError) return ''
    const error = Object.keys(controlError)[0]
    return this.errorMessages[error]
  }

  private initNameControl() {
    if (this.name)
      return new FormControl(this.name, [Validators.required, Validators.maxLength(20), Validators.minLength(3)])
    return new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)])
  }

  onClickSave() {
    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched()
      return
    }
    this.dialogRef.close(this.nameControl.value)
  }
}
