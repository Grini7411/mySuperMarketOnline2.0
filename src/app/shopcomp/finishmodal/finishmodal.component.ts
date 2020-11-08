import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ProductService } from 'src/app/service/product.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-finishmodal',
  templateUrl: './finishmodal.component.html',
  styleUrls: ['./finishmodal.component.scss']
})
export class FinishmodalComponent implements OnInit {

  constructor(private prodServ:ProductService,private orderServ:OrderService, private router:Router, public finishModalRef: MDBModalRef) { }

  ngOnInit() {
  }

  gotoRecipt(){
    this.router.navigate(['shop/print']);
    this.finishModalRef.hide();
  }
  gotoHome(){
    this.router.navigate(['/home'])
  }

}
