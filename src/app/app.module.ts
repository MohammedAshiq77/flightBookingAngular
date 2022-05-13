import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './modules';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LogoutAlertComponent } from './logout-alert/logout-alert.component';
import {NgxMatDatetimePickerModule,NgxMatNativeDateModule,NgxMatTimepickerModule  } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OnlyNumberDirective } from './common/numbersonly';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonAlertComponent } from './common-alert/common-alert.component';
import {MatRippleModule} from '@angular/material/core';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent, 
    UserComponent,
    AdminComponent,
    AlertMessageComponent,
    LogoutAlertComponent,
    OnlyNumberDirective,
    CommonAlertComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    NgxMatDatetimePickerModule, 
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatToolbarModule,
    MatIconModule,
  ],exports: [
    OnlyNumberDirective,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
