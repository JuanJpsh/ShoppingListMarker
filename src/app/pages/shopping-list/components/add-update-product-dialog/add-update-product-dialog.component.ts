import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductNoDate } from '../../models/product';

@Component({
  selector: 'app-add-update-product-dialog',
  templateUrl: './add-update-product-dialog.component.html',
  styleUrls: ['./add-update-product-dialog.component.scss']
})
export class AddUpdateProductDialogComponent {

  productControl!: FormControl;
  dialogTitle!: string;
  productOptions!: ProductNoDate[];

  constructor(
    private dialogRef: MatDialogRef<AddUpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private productName: string,
    private productSvc: ProductService,
  ) { }

  ngOnInit(): void {
    if (this.productName) this.dialogTitle = "Actualizar producto"
    else this.dialogTitle = "Añadir producto a lista"
    this.productControl = this.initNameControl();
    this.productSvc.getNotListedProducts().subscribe(
      (resp: ProductNoDate[]) => {
        this.productOptions = resp}
    )
  }

  getErrorMessage() {
    if (this.productControl.getError('required'))
      return "Este campo es obligatorio"
    return ""
  }

  onSave() {
    if (this.productControl.invalid) {
      this.productControl.markAsTouched()
      return
    }
    this.dialogRef.close(this.productOptions[this.productControl.value])
  }

  private initNameControl() {
    if (this.productName)
      return new FormControl(this.productName, [Validators.required])
    return new FormControl(null, [Validators.required])
  }
}
