import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { MaterialModule } from './material/material.module';
import { EmployeeService } from './shared/employee.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { DepartamentService } from './shared/departament.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [EmployeeService, DepartamentService],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent]
})
export class AppModule { }
