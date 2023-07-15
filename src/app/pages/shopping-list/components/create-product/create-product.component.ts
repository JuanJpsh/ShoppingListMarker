import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Provider, ProviderNoDate } from '../../models/provider';
import { ProviderService } from '../../services/provider.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Dictionary } from 'src/app/core/models/dictionary';
import { productToSaveProvider } from '../../models/product';
import { mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm!: FormGroup
  providers!: ProviderNoDate[]
  providerValidators: ValidatorFn[] = []

  constructor(
    private dialogRef: MatDialogRef<CreateProductComponent>,
    private providerSvc: ProviderService
  ) { }

  ngOnInit(): void {
    this.providerSvc.getProvidersNoDate().subscribe(resp => {
      this.providers = resp
    });
    this.productForm = this.initProductForm();
  }

  private initProductForm() {
    return new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(30),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0.001),
      ]),
      newProvider: new FormControl(false),
      provider: new FormControl(null, [
        Validators.required,
      ])
    })
  }

  onChangeCheck(checked: any) {
    this.productForm.get('provider')?.setValue(null)
    if (checked) this.addProviderValidators()
    else this.removeProviderValidators()
  }

  errorMessages: Dictionary = {
    required: "Este campo es obligatorio",
    minlength: "Este campo debe tener al menos ",
    maxlength: "Este campo debe tener maximo ",
    min: "El precio debe ser un valor valido"
  }

  getErrorMessage(contolName: string) {
    const controlError = this.productForm.get(contolName)?.errors
    if (!controlError) return ''
    const error = Object.keys(controlError)[0]
    let errorMessage = this.errorMessages[error]
    errorMessage = this.completeErrorMessage(errorMessage, error, controlError)
    return errorMessage
  }

  onCreateProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
      return
    }

    if (this.productForm.get('newProvider')?.value == false) {
      const productToSave = this.getProductToSave();
      this.dialogRef.close(productToSave)
    }
    else {
      const { provider } = this.productForm.value
      this.providerSvc.createProvider(provider).subscribe(
        provider => {
          const { name, price } = this.productForm.value
          const productToSave: productToSaveProvider = { name, price, providerId: provider.id, providerName: provider.name }
          this.dialogRef.close(productToSave)
        }
      )
    }
  }

  private getProductToSave(): productToSaveProvider {
    const providerPos = this.productForm.get('provider')?.value
    const { name, price } = this.productForm.value
    const providerId = this.providers[providerPos].id
    const providerName = this.providers[providerPos].name
    return { name, price, providerId, providerName }
  }

  private completeErrorMessage(errorMessage: string, error: string, controlError: ValidationErrors) {
    if (error == "minlength" || error == "maxlength") {
      const requiredLength = controlError[error]['requiredLength']
      errorMessage += `${requiredLength} carácteres`
    }
    return errorMessage
  }

  private addProviderValidators() {
    const minLength = Validators.minLength(2)
    const maxLength = Validators.maxLength(20)
    this.productForm.get('provider')?.addValidators([minLength, maxLength])
    this.providerValidators = [minLength, maxLength]
  }

  private removeProviderValidators() {
    this.providerValidators.forEach(validator => {
      this.productForm.get('provider')?.removeValidators(validator)
    })
    this.providerValidators = []
  }

}
