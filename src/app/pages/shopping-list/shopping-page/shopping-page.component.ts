import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../services/producto.service';
import { EmpAddEditComponent } from '../components/emp-add-edit/emp-add-edit.component';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { environmet } from 'src/environments/environment';
import { ProductNoDate } from '../models/product';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit{

  productsList!: ProductNoDate[];
  purchasedProductsList!: ProductNoDate[];

  displayedColumns: string[] = [
    'id',
    'producto',
    'cantidad',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  listName!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog: MatDialog, private _proService: ProductoService, private dataStorageSvc: DataStoreService,) {}

  ngOnInit(): void {
    this._proService.getProductoList().subscribe(resp => {
      this.productsList = resp
    })
    this.purchasedProductsList = [{
      id: 5,
      name: "Aqui deberian ir los que se van cambiado a estado comprado",
      price: 12000,
      providerId: 1
    }]
    this.getProductoList();
    this.listName = this.dataStorageSvc.getData(environmet.listNameKey) as string
  }
  
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getProductoList();
        }
      },
    });
  }

  getProductoList() {
    this._proService.getProductoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProducto(id: number) {
    this._proService.deleteProducto(id).subscribe({
      next: (res) => {
        alert('Producto borrado exitosamente!');
        this.getProductoList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getProductoList();
        }
      },
    });    
  }
}
