import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent {
  /* displayedColumns: string[] = [
    'id',
    'producto',
    'cantidad'
  ];
  dataSource!: MatTableDataSource<any>; */

 /*  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _dialog: MatDialog, private _proService: ProductoService) {}

  ngOnInit(): void {
    this.getProductoList();
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
  } */
}
