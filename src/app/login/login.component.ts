import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AppComponent } from '../app.component';
import { CommonService } from '../Service/common.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: any;
  hide=true;

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
    this.login = this.formbuilder.group({
     // email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);



  matcher = new MyErrorStateMatcher()

  loginconfirm(){
    localStorage.removeItem('Token');
    localStorage.removeItem('Tokenadmin');
    let params={
      "emailId":this.emailFormControl.value,
      "passWord": this.f.password.value
    }
    this.commonService.login(params).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.displayMessage(result['data']['message'], "Success");
        this.login.reset()
        if(result['data']['message'].includes("User")){
          localStorage.setItem("Token",JSON.stringify(result['data']));

          this.router.navigate(['/user'])
        }else{
          localStorage.setItem("Tokenadmin",JSON.stringify(result['data']));
          this.router.navigate(['/admin'])
        }
      }else{
        this.displayMessage("Invalid Login Credentials", "Alert");
        localStorage.removeItem('Token');
        localStorage.removeItem('Tokenadmin');
      }
    })
  }

  get f() { return this.login.controls; }

  displayMessage(message: any, type: any) {
    const dialogRef = this.dialog.open(AlertMessageComponent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
}
