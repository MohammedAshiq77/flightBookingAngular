import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class CommonService {
  baseUrl = environment.basePublicUrl;

  constructor(private httpClient: HttpClient) {}

  public get currentUserValue() {
    return (localStorage.getItem('Token'))?(localStorage.getItem('Token')):null
  }
  public get currentUserValueadmin() {
    return (localStorage.getItem('Tokenadmin'))?(localStorage.getItem('Tokenadmin')):null
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  Registration(params:any){
    return this.httpClient.post<any>(this.baseUrl + "UserController/UserRegistrations",  params )
  }
  login(params:any){
    return this.httpClient.post<any>(this.baseUrl + "UserController/Login",  params )
  }
  AddAirline(params:any){
    return this.httpClient.post<any>(this.baseUrl + "AdminController/AirLineRegister",  params )
  }
  manageAirline(){
    return this.httpClient.get<any>(this.baseUrl + "AdminController/GetFlightDetails")
  }
  DiscountDashboard(){
    return this.httpClient.get<any>(this.baseUrl + "AdminController/GetCouponDtls")
  }
  scheduleAirline(params){
    return this.httpClient.post<any>(this.baseUrl + "AdminController/BlockAndUnblockAirline",  params )
  }
  InventryPost(params){
    return this.httpClient.post<any>(this.baseUrl + "AdminController/AddAirLineInventory",  params )
  }
  Adddiscount(params:any){
    return this.httpClient.post<any>(this.baseUrl + "AdminController/AddCoupon",  params )
  }
  searchplaces(params:any){
    return this.httpClient.post<any>(this.baseUrl + "UserController/FlightSearch",  params )
  }
  TicketBooking(params:any){
    return this.httpClient.post<any>(this.baseUrl + "UserController/AirlineTicketBooking",  params )
  }
  schedulediscount(params){
    return this.httpClient.post<any>(this.baseUrl + "AdminController/ActivateNBlock",  params )
  }
  TicketCancel(params){
    return this.httpClient.post<any>(this.baseUrl + "UserController/CancelBookedTicket", params )
  } 
  TicketSearch(params){
    return this.httpClient.post<any>(this.baseUrl + "UserController/GetTicketDetails", params )
  } 
  TicketSearchEmail(params){
    return this.httpClient.post<any>(this.baseUrl + "UserController/GetTicketDetailsHis", params )
  } 
}
