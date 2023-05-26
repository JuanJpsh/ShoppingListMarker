import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-update-market-dialog',
  templateUrl: './add-update-market-dialog.component.html',
  styleUrls: ['./add-update-market-dialog.component.scss']
})
export class AddUpdateMarketDialogComponent implements OnInit {
  nameControl!: FormControl;

  constructor(public dialogRef: MatDialogRef<AddUpdateMarketDialogComponent>) {}

  ngOnInit(): void {
    this.nameControl = this.initNameControl();
  }

  getErrorMessage() {
    if (this.nameControl.getError('required'))
      return "Este campo es obligatorio"
    else if (this.nameControl.getError("minlength"))
      return "Este campo debe tener al menos 3 carácteres"
    else if (this.nameControl.getError("maxlength"))
      return "Este campo debe tener maximo 20 carácteres"
    return ""
  }

  private initNameControl() {
    return new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)])
  }

  onClickSave(){
    if (this.nameControl.invalid){
      this.nameControl.markAsTouched()
      return
    }
    this.dialogRef.close(this.nameControl.value)
  }
}
