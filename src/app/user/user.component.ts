import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AppComponent } from '../app.component';
import { CommonService } from '../Service/common.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CommonAlertComponent } from '../common-alert/common-alert.component';
import html2pdf from 'html2pdf.js'
import {} from '@angular/core';
import { FormGroupDirective, NgForm, } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);



  matcher = new MyErrorStateMatcher()
   searchdatalist: any=[];
  
  flag: boolean=false;
  flightlist: any;
  flag2: boolean=false;
  gender:any=[{name:"Male",id:1},{name:"Female",id:2}]
  maeltype:any=[{name:"Veg Meal",id:1},{name:"Non-Veg Meal",id:2}]
  journeys:any=[{value:1,viewvalue:"One Way Trip"},{value:2,viewvalue:"Two Way Trip"}]
  trip:any ="One Way Cost";
  getTicketBookedDtList:any=[]
 
  pnr: any;
  searchflag: boolean=false;
  getTicketHistory: any=[];
 
  searchflag1: boolean=false;
  userdata:any;

  journeychange(event){    
    if(event.value==1){
      this.trip="One Way Cost"
      this.BookTicket.patchValue({
        WayCost: this.flightlist['businessTicketCost']
      });
    }else{
      this.trip="Two Way Cost"
      this.BookTicket.patchValue({
        WayCost: Number(this.flightlist['businessTicketCost'])*2
      });
    }
  }
  selectairline(element){
    // console.log(element);
    this.clear()
    this.flightlist=element
    this.flag2=true;

    this.BookTicket.patchValue({
      airLine: this.flightlist['airLine'],
      flightNumber:this.flightlist['flightNumber'],
      airLineType:this.flightlist['airLineType'],
      totalseats:Number(this.flightlist['totalBusinessSeats'])+Number(this.flightlist['totalNonBusinessSeats']),
      ticketcost:this.flightlist['businessTicketCost'],
      totalBookSeats:1,
      journey:1,
      WayCost:this.flightlist['businessTicketCost'],
      userName:this.userdata['userName'],
      userEmail:this.userdata['userEmail']
    });
    this.trip="One Way Cost"
  }

  dateFormControl = new FormControl('', [Validators.required]);

  get g() { return this.BookTicket.controls; }

  options: any = [
    {places: 'New Delhi'}, {places: 'Mumbai'}, {places: 'Bangalore'},
    {places: 'Chennai'}, {places: 'Hyderabad'}, {places: 'Goa'},
    {places: 'Kolkata'}, {places: 'Pune'}, {places: 'JAipur'},
    {places: 'Lucknow'},
  ];
  options1: any = [];
  filteredplaces: Observable<any[]>;
  filteredplaces1: Observable<any[]>;


  onTabChanged(){
    this.flag=false
    this.flag2=false;
    this.searchflag=false;
    this.searchflag1=false;
    this.BookTicket.reset()

    this.filteredplaces = this.g.fromplace.valueChanges.pipe(
      startWith(''),
      map(places => (places ? this._filterplaces(places) : this.options.slice())),
    );
    
  }

  private _filterplaces(value) {
    const filterValue = value.toLowerCase();
    return this.options.filter(places => places['places'].toLowerCase().includes(filterValue));
  }

  private _filterplaces1(value) {
    const filterValue1 = value.toLowerCase();
    return this.options1.filter(places => places['places'].toLowerCase().includes(filterValue1));
  }

  searchplaces(){
    this.flag=true
    let param={
      "from": this.g.fromplace.value,
      "to": this.g.toplace.value,
      // "flightStartDateTime": "2022-04-30T15:52:03.570Z"
    }
    this.commonService.searchplaces(param).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.searchdatalist=result['data']['airlinInventoryProperties']
        
      }else{
        this.displayMessage("Cannot Find the Required Flight", "Alert");
      }
    })
  }

  gettoplace(){
    this.flag=false
    this.flag2=false;

    let fromplace=this.g.fromplace.value
    this.g.toplace.reset()
    this.options1=this.options
    this.options1 = this.options1.filter(item => item['places'] !== fromplace);

    this.filteredplaces1 = this.g.toplace.valueChanges.pipe(
      startWith(''),
      map(places1 => (places1 ? this._filterplaces1(places1) : this.options1.slice())),
    );
  }
  getflag(){
    this.flag=false
    this.flag2=false;
  }

  TicketDtls: any=this.formbuilder.group({
    pnrsearch: ['',Validators.required],
  })

  BookTicket: any=this.formbuilder.group({
    fromplace: ['',Validators.required],
    toplace: ['',Validators.required],
    airLine: ['',Validators.required],
    flightNumber: ['',Validators.required],
    airLineType: ['',Validators.required],
    totalseats:  ['',Validators.required], 
    ticketcost:  ['',Validators.required], 
    journey:  ['',Validators.required], 
    WayCost:  ['',Validators.required],
    totalBookSeats:  ['',Validators.required], 
    couponCode:  ['',Validators.required], 
    discountPrice:  ['',Validators.required], 
    // bookedDate:  ['',Validators.required], 
    userName:  ['',Validators.required], 
    userEmail:  ['',Validators.required], 
    gender:  ['',Validators.required], 
    age:  ['',Validators.required], 
    meal:  ['',Validators.required], 
    seatNumber:  ['',Validators.required], 

  })



  constructor(
    private formbuilder: FormBuilder,
    private dialog: MatDialog,
    private app:AppComponent,
    private commonService: CommonService,
    private router:Router,
) { 
  app.showtoolbar()
}

  ngOnInit(): void {
    this. onTabChanged()

    this.userdata=JSON.parse(localStorage.getItem('Token'))
    console.log(this.userdata);

  
    
  }

Ticketconfirm(){
let param={
  "flightId": this.g.flightNumber.value,
  "bookingId": "",
  "userId": 1,
  "journey": this.g.journey.value,
  "oneWayCost": this.g.journey.value==1?this.g.WayCost.value:0,
  "twoWayCost": this.g.journey.value==2?this.g.WayCost.value:0,
  "totalBookSeats": 1,
  "couponCode": this.g.couponCode.value,
  "discountPrice": this.g.discountPrice.value,
  "bookedDate": new Date(),
  "userName": this.g.userName.value,
  "pnr": "",
  "userEmail": this.g.userEmail.value,
  "gender": this.g.gender.value,
  "age": this.g.age.value,
  "meal": this.g.meal.value,
  "seatNumber": this.g.seatNumber.value,
  "createDate": new Date(),
  "type": 0,
  "flag": 0
}
console.log(param);

this.commonService.TicketBooking(param).subscribe((result :any) => {
  if(result['status'].includes("SUCCESS")){
    this.displayMessage(result['data']['message'], "Success");
    this.BookTicket.reset()
  }else{
    this.displayMessage("Ticket Booking Failed", "Alert");
    // this.BookTicket.reset()
  }
})
  }
  discountedPrice(){
    let coupon=(this.g.couponCode.value).split("t")
    let value=Number(coupon[1])
    let cost;
    if(this.trip.includes("One")){
   cost=Number(this.g.WayCost.value)-value
   console.log(cost);
    }else{
      cost=Number(this.g.WayCost.value)-(value*2)

      console.log(cost);
    }
    this.BookTicket.patchValue({
      discountPrice: cost
    });
  }

clear(){
this.g.airLine.reset()
this.g.flightNumber.reset()
this.g.airLineType.reset()
this.g.totalseats.reset() 
this.g.ticketcost.reset() 
this.g.journey.reset() 
this.g.WayCost.reset() 
this.g.totalBookSeats.reset() 
this.g.couponCode.reset() 
this.g.discountPrice.reset() 
// this.g.bookedDate.reset() 
this.g.userName.reset() 
this.g.userEmail.reset() 
this.g.gender.reset() 
this.g.age.reset() 
this.g.meal.reset() 
this.g.seatNumber.reset() 
}
  displayMessage(message: any, type: any) {
    const dialogRef = this.dialog.open(AlertMessageComponent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
  TicketSearch(){
    let param={
      "pnr": this.TicketDtls.controls.pnrsearch.value
    }
    this.pnr=this.TicketDtls.controls.pnrsearch.value
    this.commonService.TicketSearch(param).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.getTicketBookedDtList=result['data']['getTicketBookedDtPropertiesList'][0]
        this.searchflag=true
      }else{
        this.displayMessage("No Data Found", "Alert");
      }
    })
  }
  TicketSearchEmail(){
    // this.searchflag1=true
    let param={
      "emailId": this.emailFormControl.value
    }
    this.commonService.TicketSearchEmail(param).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.getTicketHistory=result['data']['getTicketBookedDtPropertiesList']
        this.searchflag1=true
      }else{
        this.displayMessage("No Data Found", "Alert");
      }

    })
  }
  Cancelsearch(){
    if(this.TicketDtls.valid){
      const dialogRef = this.dialog.open(CommonAlertComponent, {
        width: '30%',
        height: '30%'
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult == true) {
    let param={
      "pnr": this.TicketDtls.controls.pnrsearch.value
    }
    console.log(param)
    this.commonService.TicketCancel(param).subscribe((result :any) => {
    
      if(result['status'].includes("SUCCESS")){
        this.displayMessage(result['data']['message'], "Success");
                this.TicketDtls.reset()
                this.searchflag=false;
      }else{
        this.displayMessage("Ticket Cancelling Failed", "Alert");
        // this.BookTicket.reset()
      }
    })
  }
})
  }else{
    this.displayMessage("Enter A Valid PNR Number", "Alert");
  }
}
generatePdf(flag) {
  let element
  if(flag==1){
    element = document.getElementById('printSectionId');
    var opt = {
      margin:       .5,
      filename:     "PNR_Dtls_"+this.pnr+'.pdf',
      image:        { type: 'jpeg', quality: 0.90 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  }else{
    element = document.getElementById('printSectionId1');
    var opt = {
      margin:       .3,
      filename:     "Email_Dtls_"+this.emailFormControl.value+'.pdf',
      image:        { type: 'jpeg', quality: 0.90 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  }

    html2pdf().set(opt).from(element).save()
}

}
