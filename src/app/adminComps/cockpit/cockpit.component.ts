import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddprodComponent } from '../addprod/addprod.component';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {
  addFormModalRef:MDBModalRef;


  modalOptions={
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: 'modal-lg',
    animated: true
  };



  constructor(private router:Router,private modalServ:MDBModalService) { }

  ngOnInit() {
  }

  addProdForm(){
    //this.router.navigate(['/admin/newprod']);
    this.addFormModalRef = this.modalServ.show(AddprodComponent,this.modalOptions);
  }

  newUser(){
    this.router.navigate(['/admin/adduser']);
  }

  gotoAllProds(){
    this.router.navigate(['/admin/allprods']);

  }
  gotoAllOrders(){
    this.router.navigate(['/admin/allorders']);
  }

 
}
