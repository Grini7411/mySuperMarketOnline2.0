import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';

import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';




@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit, OnChanges
{
  modalRef:MDBModalRef;

  constructor(private orderServ:OrderService, private prodServ:ProductService, private router:Router) { }

  @Input() userID:string;
  @Input() currentCartID:any;
  
  cartUnits:any[]=[];
  tableHeaders:String[] = ['#','Product Name','Quantity','Total Price','del']
  totalPrice:Number = 0;

  modalOptions:any={
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {
        heading: 'Modal heading',
        content: { heading: 'Content heading', description: 'Content description'}
      }
    }


    ngOnChanges()	{
      this.refresh();
      this.prodServ.myProdEmitter.subscribe(data=>{
        this.refresh()
      })
    }

    refresh(){
      if (this.currentCartID)  {
        this.prodServ.joinProductAndCartUnits(this.currentCartID).subscribe(data=>{
            
            this.cartUnits = data;
            this.orderServ.cartUnits = this.cartUnits;
            this.totalPrice = this.cartUnits.reduce(function(prev,current){
              return prev + current.gen_price
            },0)
            this.orderServ.totalPrice = this.totalPrice
            
          })
      }

    }
  ngOnInit() {
    this.refresh();
    this.prodServ.myProdEmitter.subscribe(data=>{
      this.refresh()
    })


  }

  gotoNewOrder(){
    let sendToOrder={
      cartID:this.currentCartID,
      userID:this.userID,
      total:this.totalPrice,
      cartUnits:this.cartUnits
    }
    
    this.router.navigate(['shop/neworder'],{state:sendToOrder})
  }
  delCartUnit(cartUnit){
    this.prodServ.delCartUnit(cartUnit).subscribe(data=>{
      this.prodServ.myProdEmitter.emit('deleted!');
      alert(data.msg)

    })
  }

  clearCart(){

    this.prodServ.clearCartUnits(this.currentCartID).subscribe(data=>{
      alert(data.msg)
      this.prodServ.myProdEmitter.emit('deleteAll!!')
    })
  }


}


