import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/pages/shopping-list/services/producto.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
  
})

export class EmpAddEditComponent {
  empForm: FormGroup;

  producto: string[] = [
    'Arroz Florhuila Platino 1Kg OLIMPICA $6.400',
    'Arroz Florhuila 3 Kg OLIMPICA $13.650',
    'Arroz Doña Pepa 500 gr OLIMPICA $3.350',
    'Arroz Sabrosón 1 Kg OLIMPICA $4.500',
    'Atún Medalla De Oro Lomitos En Agua 170 gr OLIMPICA $5.590',
    'Atún Medalla De Oro Rallado En Acite 170 gr OLIMPICA $3.990',
    'Atún Medalla De Oro Lomitos En Aceite Vegetal 170 gr OLIMPICA $5.590',
    'Atún Van Camps Lomo En Agua 160 gr OLIMPICA $7.990',
    'Queso Blanco Colanta 500 gr OLIMPICA $14.800',
    'Queso Crema Colanta 230 gr OLIMPICA $5.350',
    'Queso Doble Crema Olimpica 450 gr OLIMPICA $13.500',
    'Queso Crema Colanta 400 gr OLIMPICA $10.390',
    'Queso Colanta Para Asar 500 gr OLIMPICA $20.400',
    'Queso Colanta Mozzarella de Búfala 250 gr OLIMPICA $11.950'
  ];

  cantidad: string[] = [
    '1',
    '2',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];
  constructor(
    private _fb: FormBuilder,
    private _empService: ProductoService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.empForm = this._fb.group({
      producto: '',
      cantidad: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid) {
      if(this.data) {
        this._empService.updateProducto(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Produto actualizado exitosamente!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addProducto(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Produto exitosamente agregado!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
