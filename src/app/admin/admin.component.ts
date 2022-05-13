import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { AppComponent } from '../app.component';
import { CommonService } from '../Service/common.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CommonAlertComponent } from '../common-alert/common-alert.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
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
  this.onTabChanged()
}
  
  AddAirline: any=this.formbuilder.group({
    airlineName: ['',Validators.required],
    airlinetype: ['',Validators.required],
    businessFare: ['',Validators.required],
    econnmyFare: ['',Validators.required],
    maxSeat: ['',Validators.required],
    selectdate:  ['',Validators.required], 
  })
  ManageInventry: any=this.formbuilder.group({
    flightNumber: ['',Validators.required],
    airLineId: ['',Validators.required],
    from: ['',Validators.required],
    to: ['',Validators.required],
    flightStartDateTime: ['',Validators.required],
    flightToDateTime: ['',Validators.required],
    totalBusinessSeats: ['',Validators.required],
    totalNonBusinessSeats: ['',Validators.required],
    flightSeatRow: ['',Validators.required],
  })
  ManageDiscounts: any=this.formbuilder.group({
    couponId: ['',Validators.required],
    couponCode: ['',Validators.required],
    couponvalue: ['',Validators.required],
    couponValidty:  ['',Validators.required], 
  })

  get f() { return this.AddAirline.controls; }
  get a() { return this.ManageDiscounts.controls; }
  get g() { return this.ManageInventry.controls; }
  
  myDatePickerFrom:any;
  getairlinedetails: any=[];
  getairlineid: any;
  filter:any;
  discountflag: boolean =true;
  flighttablelist: any=[];
  discounttablelist:any=[];
  filteredairlineids: Observable<any[]>;
  displayedColumns: string[] = ['airLineName','flightID', 'airLineCode', 'airplanType', 'businessFare', 'econnmyFare', 'maxSeat', 'status'];
  displayedColumns1: string[] = ['couponId', 'couponCode', 'couponvalue', 'couponValidty', 'status'];
  dataSource = new MatTableDataSource<any>(this.flighttablelist);
  dataSource1 = new MatTableDataSource<any>(this.discounttablelist);

  onTabChanged(){
    this.dashboardData()
    this.DiscountdashboardData()
    this.discountflag=true;

    this.AddAirline.reset()
    this.ManageInventry.reset()
    this.ManageDiscounts.reset()

    this.filteredairlineids = this.g.flightNumber.valueChanges.pipe(
      startWith(''),
      map(airlineid => (airlineid ? this._filterairlineids(airlineid) : this.flighttablelist.slice())),
    );
  }

  private _filterairlineids(value) {
    const filterValue = value.toLowerCase();
    return this.flighttablelist.filter(airlineid => airlineid['flightID'].toLowerCase().includes(filterValue));
  }

  dashboardData(){
    this.commonService.manageAirline().subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.flighttablelist=result['data']['flightDetailsTablelist']
        this.dataSource = new MatTableDataSource<any>(this.flighttablelist);
      }
    }) 
  }

  applyFilter(filterValue: any) {
    let a: any = filterValue.target.value
    filterValue = a.trim(); 
    filterValue = a.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ManageAirlinePost(element:any){
    let param
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: '30%',
      height: '30%'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
    if(element['status']==0){
      param={
          "airlinCode": element['airLineCode'],
          "flightNumber": element['flightID'],
          "status": 1
        }
    }else{
      param={
        "airlinCode": element['airLineCode'],
        "flightNumber": element['flightID'],
        "status": 0
        }
    }
    this.commonService.scheduleAirline(param).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.dashboardData()
      }else{
        if(element['status']==0){
        this.displayMessage("Specified Airline Cannot be Blocked", "Alert");
        }else{
        this.displayMessage("Specified Airline Cannot be Un-Blocked", "Alert");
        }
      }
    })
  }
})
}

  DiscountdashboardData(){
    this.commonService.DiscountDashboard().subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.discounttablelist=result['data']['couponCodeDtlsPropertiesList']
        this.dataSource1 = new MatTableDataSource<any>(this.discounttablelist);
      }
    })
  }

  applyFilter1(filterValue: any) {
    let a: any = filterValue.target.value
    filterValue = a.trim();
    filterValue = a.toLowerCase();
    this.dataSource1.filter = filterValue;
  }

  ManageDiscountsPost(element:any){
    let param
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: '30%',
      height: '30%'
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
    if(element['status']==0){
      param={
        "couponId": element['couponId'],
        "status": 1
        }
    }else{
      param={
        "couponId": element['couponId'],
        "status": 0
        }
    }
    this.commonService.schedulediscount(param).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.DiscountdashboardData()
      }else{
        if(element['status']==0){
        this.displayMessage("Coupon Cannot be Blocked", "Alert");
        }else{
        this.displayMessage("Coupon Cannot be Un-Blocked", "Alert");
        }
      }
    })
  }
})
}

AddDiscount(){
  let params={
    "couponId": this.a.couponId.value,
    "couponCode": this.a.couponCode.value,
    "couponvalue": this.a.couponvalue.value,
    "couponValidty": this.a.couponValidty.value,
    "status": 0
  }    
  this.commonService.Adddiscount(params).subscribe((result :any) => {
    if(result['status'].includes("SUCCESS")){
      this.displayMessage("Discount"+result['data']['message'], "Success");
      this.ManageDiscounts.reset()
    }else{
      this.displayMessage("Discount Generation Failed", "Alert");
    }
  })
}

managecoupon(){
  this.DiscountdashboardData()
  this.discountflag=false
}
managecoupon1(){
  this.discountflag=true
}


AddAirlineconfirm(){
    let params={
      "airlineName": this.f.airlineName.value,
      "airplanType": this.f.airlinetype.value,
      "businessFare": this.f.businessFare.value,
      "econnmyFare": this.f.econnmyFare.value,
      "maxSeat": this.f.maxSeat.value,
      "startTime": this.f.selectdate.value,
      "status": 0
    }    
    this.commonService.AddAirline(params).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.displayMessage(result['data']['message'], "Success");
        this.AddAirline.reset()
      }else{
        this.displayMessage("Adding Airlines Failed", "Alert");
      }
    })
  }
  
  inventryconfirm(){
    let params={
      "flightNumber": this.g.flightNumber.value,
      "airLineId": this.g.airLineId.value,
      "from": this.g.from.value,
      "to": this.g.to.value,
      "flightStartDateTime": this.g.flightStartDateTime.value,
      "flightToDateTime": this.g.flightToDateTime.value,
      "totalBusinessSeats": this.g.totalBusinessSeats.value,
      "totalNonBusinessSeats": this.g.totalNonBusinessSeats.value,
      "flightSeatRow": this.g.flightSeatRow.value,
    }
    console.log(params);
    
    this.commonService.InventryPost(params).subscribe((result :any) => {
      if(result['status'].includes("SUCCESS")){
        this.displayMessage("Inventry Update is Successful", "Success");
        this.ManageInventry.reset()
    }else{
      this.displayMessage("Inventry Update is Unsuccessful", "Alert");
    }
  })
  }

  getairlineiddetails(){
    this.getairlineid=this.g.flightNumber.value
    this.getairlinedetails= this.flighttablelist.filter(airlineid => airlineid['flightID'].toLowerCase().includes(this.getairlineid.toLowerCase()));
    this.ManageInventry.patchValue({
      airLineId: this.getairlinedetails[0]['airLineCode']
    });
  }

  displayMessage(message: any, type: any) {
    const dialogRef = this.dialog.open(AlertMessageComponent, {
      width: '30%',
      data: { message: message, type: type }
    });
  }
}
