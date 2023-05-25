import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from 'src/app/emp-add-edit/emp-add-edit.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog) {}

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
