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
import { MarketTitleService } from 'src/app/core/services/market-title.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {

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

  constructor(
    private _dialog: MatDialog,
    private _proService: ProductoService,
    private marketTitleSvc: MarketTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /**
     * this._proService.getProductoList() deberia ser un observable que devuelva dos listas separadas.
     * primera lista: la de productos que tengan estado sin comprar
     * segunda lista: la de productos que tengan estado comprado
     * cada una de estas deberia asignarse a productsList y purchasedProductsList correspondientemente
     * NOTA: Todos los productos de las dos listas tienen que pertenecer al listado en cuestion (marketId)
     */
    this._proService.getProductoList().subscribe(resp => {
      this.productsList = resp
      this.purchasedProductsList = []
    })

    this.route.params.pipe(
      mergeMap((params) => this.marketTitleSvc.getMarketTitle(Number.parseInt(params['id'])))
    ).subscribe((title: string) => {
      this.listName = title
    })

    this.getProductoList();
  }

  moveProductToPurchased(indexProduct: number) {
    /**
     * Primero deberia llamar al metodo para cambiar el estado del producto en la tabla lista_producto
     */
    this.purchasedProductsList.push(this.productsList[indexProduct])
    this.productsList.splice(indexProduct, 1)
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
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
        if (val) {
          this.getProductoList();
        }
      },
    });
  }
}
