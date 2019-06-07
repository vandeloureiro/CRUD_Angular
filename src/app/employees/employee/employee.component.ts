import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartamentService } from 'src/app/shared/departament.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService, 
    public departamentService: DepartamentService, 
    public notificationService: NotificationService,
    private dialogRef: MatDialogRef<EmployeeComponent>) { }

  departaments = [
    { id: 1, value: "Dep 1"},
    { id: 2, value: "Dep 2"},
    { id: 3, value: "Dep 3"}
  ];
  
  ngOnInit() {
    this.service.getEmployees();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
        this.service.insertEmployee(this.service.form.value);
      else
        this.service.updateEmployee(this.service.form.value); 
      console.log(this.service.form.value);    
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully!');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
