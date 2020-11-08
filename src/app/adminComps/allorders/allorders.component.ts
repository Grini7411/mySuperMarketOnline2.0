import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  allOrders:any[] = []
  headElements:String[] = ['#','first Name','Last Name', 'City', 'Street', 'Delivery Date','Order Date','Final Price']



  constructor(private titleServ:Title, private orderServ:OrderService, private router:Router) { }

  ngOnInit() {
    this.titleServ.setTitle('Main Shop Page')

    this.orderServ.getAllOrders().subscribe(data=>{
      this.allOrders = data
    })
  }

  deleteOrder(orderID){
    this.orderServ.deleteOrder(orderID).subscribe(data=>{
      this.orderServ.ordersEmitter.emit('bla')
    })
  }
  gotoCockpit(){
    this.router.navigate(['/admin/cockpit']);
  }



}
