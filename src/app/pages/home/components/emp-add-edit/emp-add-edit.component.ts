import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
  
})

export class EmpAddEditComponent {
  empForm: FormGroup;

  producto: string[] = [
    'Arroz Florhuila Platino 1Kg OLIMPICA $6.400',
    'Arroz Florhuila Blanco 500gr OLIMPICA $2.470',
    'Arroz Florhuila 3Kg OLIMPICA $13.650',
    'Arroz Doña Pepa 500gr OLIMPICA $3.350',
    'Arroz Sabrosón 1Kg OLIMPICA $4.500',
    'Atún Medalla De Oro Lomitos En Agua 170 G OLIMPICA $5.590',
    'Atún Medalla De Oro Rallado En Acite 170 G OLIMPICA $3.990',
    'Atún Medalla De Oro Lomitos En Aceite Vegetal 170 G OLIMPICA $5.590',
  ];

  cantidad: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];
  constructor(private _fb: FormBuilder, private _empService: ProductoService, private _dialogRef: DialogRef<EmpAddEditComponent>) {
    this.empForm = this._fb.group({
      producto: '',
      cantidad: '',
    });
  }

  onFormSubmit(){
    if(this.empForm.valid) {
      this._empService.addProducto(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Produto exitosamente agregado!');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

}
