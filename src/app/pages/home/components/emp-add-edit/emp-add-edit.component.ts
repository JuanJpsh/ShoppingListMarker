import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
  
})

export class EmpAddEditComponent {
  empForm: FormGroup;

  producto: string[] = [
    'Arroz Florhuila 500 gr',
    'Arroz Florhuila 1 Kg',
    'Arroz Florhuila 3 Kg',
  ];

  cantidad: string[] = [
    '1',
    '2',
    '3',
  ];
  constructor(private _fb: FormBuilder) {
    this.empForm = this._fb.group({
      producto: '',
      cantidad: '',
    });
  }

  onFormSubmit(){
    if(this.empForm.valid) {
      console.log(this.empForm.value);
    }
  }

}
