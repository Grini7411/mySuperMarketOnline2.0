import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { FinishmodalComponent } from '../finishmodal/finishmodal.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss']
})
export class NeworderComponent implements OnInit {

  modalOptions={
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: 'modal-lg',
    animated: true
  };
  
  


  @Input() ccn;
  getObj:any = {};
  allCity: any[]= [];
  finishModalRef: MDBModalRef;
  creditCardMsg:String = "Enter a valid Credit Card"
  clientFullName:String = ""

  constructor(private prodServ:ProductService, private userServ:UserService,private orderServ:OrderService, private router:Router,private modalServ:MDBModalService) { 
  }

  orderForm = new FormGroup({
    street:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    deliveryDate:new FormControl(null,[Validators.required]),
    creditCard:new FormControl(null,[Validators.required,Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?)$')])
  })
  ngOnInit() {
    this.orderServ.cartUnits = history.state.cartUnits;
    this.clientFullName = `${this.userServ.userConnected.first_name} ${this.userServ.userConnected.last_name}`
    this.checkCreditCard()


    this.getObj = {
      userID:history.state.userID,
      totalPrice:history.state.total,
      cartID:history.state.cartID
    }
    this.prodServ.getAllCities().subscribe(data=>{
      this.allCity = data;
    })
  }

  creditCardChanged() {
    this.checkCreditCard()
  }

  checkCreditCard() {
    var ccElm = document.querySelector("input[formControlName='creditCard']")
    let ccVal = this.orderForm.get('creditCard')
    if(ccVal.errors){
      ccElm.classList.add('invalid-input')
    }
    else {
      ccElm.classList.remove('invalid-input')
    }
  }




  save(){
    if(this.orderForm.valid){
      let sentOrderObj = {
        order:this.orderForm.value,
        extras:this.getObj
      }
      console.log('sent to order: ',sentOrderObj)
      this.orderServ.saveOrder(sentOrderObj).subscribe(data=>{
        if(data.orderID){
          console.log('respond from save order',data.msg,data.orderID);
          this.orderServ.currentOrderID = data.orderID;
          localStorage.setItem('orderID',JSON.stringify(data.orderID))
          this.finishModalRef = this.modalServ.show(FinishmodalComponent,this.modalOptions); 
        }
        else{
          alert(data.msg)
        }

      })

         
    }
  }

  cancelOrder(){
    this.router.navigate(['/shop/main'])
  }


  backToCart(){
    this.router.navigate(['/shop/main']);
    }
  
}



