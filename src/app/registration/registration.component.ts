import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AppComponent } from '../app.component';
import { CommonService } from '../Service/common.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registration: any;
  flag: number=0;
  hide = true;
  hide1 =true;

  constructor(
    private formbuilder: FormBuilder,
    private dialog: MatDialog,
    private app:AppComponent,
    private commonService: CommonService,
    private router:Router,
    ) {
      app.hidetoolbar()
     }

  ngOnInit(): void {
    this.registration = this.formbuilder.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      repass: ['',Validators.required]
    })

  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);



  matcher = new MyErrorStateMatcher()

  register(){
if(this.flag==1){

  let params={
    "name": this.f.name.value,
    "emailId": this.emailFormControl.value,
    "userName": this.f.username.value,
    "passWord": this.f.password.value,
    "confirmPassword": this.f.repass.value,
    "type": 0
  }
  this.commonService.Registration(params).subscribe((result :any) => {
    if(result['status'].includes("SUCCESS")){
      this.displayMessage("User is Created Sucessfully", "Success");
      this.registration.reset()
      this.router.navigate(['/login'])
    }else{
      this.displayMessage("Something Went Wrong", "Alert");
    }
  })
}else{
  this.displayMessage("Password Mis-Match", "Alert");
}
  }

  Conf_Pass(event:any){
        let password=this.f.password.value
        if(password===event.target.value){
         this.flag=1;
        }else{
        this.flag=0
        }
  }

  get f() { return this.registration.controls; }

  displayMessage(message: any, type: any) {
    const dialogRef = this.dialog.open(AlertMessageComponent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
}
