import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  
  
  constructor(private http:HttpClient) { }
  cartUnits:any[]=[];
  totalPrice: Number;
  currentOrderID:String;

  ordersEmitter:EventEmitter<any> = new EventEmitter();


  saveOrder(order:any):Observable<any>{
    let url = `http://localhost:3000/smo/neworder`
    return this.http.post(url,order,httpOptions)
  }
  
  deleteOrder(orderID:string):Observable<any>{
    let url = `http://localhost:3000/smo/${orderID}`
    return this.http.delete(url,httpOptions)
  }

  editOrder(updated:any):Observable<any>{
    let url = `http://localhost:3000/smo/updateorder/`
    return this.http.put(url,updated)
  }

  getAllOrders():Observable<any>{
    let url = `http://localhost:3000/smo/allorders`
    return this.http.get(url)
  }

}
