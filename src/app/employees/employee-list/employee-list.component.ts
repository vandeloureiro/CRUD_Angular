import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DepartamentService } from 'src/app/shared/departament.service';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departamentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private service: EmployeeService, 
    private departamentService: DepartamentService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          let departamentName = this.departamentService.getDepartamentName(item.payload.val()['departament']);
          return {
            $key: item.key, 
            departamentName,
            ... item.payload.val()
          }; 
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(elem => {
            return elem != 'actions' && data[elem].toLowerCase().indexOf(filter) != -1;
          });
        }
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

}
