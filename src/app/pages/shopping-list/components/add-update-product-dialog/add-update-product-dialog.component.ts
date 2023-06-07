import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductNoDate } from '../../models/product';

@Component({
  selector: 'app-add-update-product-dialog',
  templateUrl: './add-update-product-dialog.component.html',
  styleUrls: ['./add-update-product-dialog.component.scss']
})
export class AddUpdateProductDialogComponent implements OnInit {

  productControl!: FormControl;
  dialogTitle!: string;
  productOptions!: ProductNoDate[];

  constructor(
    private dialogRef: MatDialogRef<AddUpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private product: ProductNoDate,
    private productSvc: ProductService,
  ) { }

  ngOnInit(): void {
    if (this.product) this.dialogTitle = "Actualizar producto"
    else this.dialogTitle = "Añadir producto a lista"
    this.productControl = this.initProductControl();
    this.productSvc.getNotListedProducts().subscribe(
      (resp: ProductNoDate[]) => {
        this.productOptions = resp
        if (this.product)
          this.productOptions = [this.product, ...this.productOptions]
      }
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

  private initProductControl() {
    if (this.product)
      return new FormControl(null, [Validators.required])
    return new FormControl(null, [Validators.required])
  }
}
