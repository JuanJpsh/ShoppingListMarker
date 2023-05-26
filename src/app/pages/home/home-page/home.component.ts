import { Component } from '@angular/core';
import { EmpAddEditComponent } from '../components/emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _dialog: MatDialog) {}

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
