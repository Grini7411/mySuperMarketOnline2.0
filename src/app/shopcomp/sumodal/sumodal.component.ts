import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-sumodal',
  templateUrl: './sumodal.component.html',
  styleUrls: ['./sumodal.component.scss']
})
export class SumodalComponent implements OnInit {

  tableHeaders:String[] = ['#','Product Name','Quantity','Total Price','delete Product'];




  
  constructor(private prodServ:ProductService) { }

  ngOnInit() {
  }

  goToSum():void{

  }

}
