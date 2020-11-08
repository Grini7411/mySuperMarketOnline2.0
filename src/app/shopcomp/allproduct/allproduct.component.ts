import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { product } from "src/app/models/productModel";
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss']
})
export class AllproductComponent implements OnInit,OnChanges {

  allProducts:product[]=[];
  allCategories:any[] =[];
  categoryId:any;
  @Input() currentCartID:String;
  @Input() change:boolean;
  @Input() searchWord:String;
  
  constructor(private prodServ:ProductService) { }


  ngOnChanges(change1: SimpleChanges): void {
    this.refreshProd();
  }

  ngOnInit() {
  this.prodServ.getCategory().subscribe(data=>{
    this.allCategories = data;
  })

   this.refreshProd();
  }

  filterCategory(categoryid){
    this.categoryId = categoryid;
    this.refreshProd()
  }

  refreshProd(){
    this.prodServ.getAllProducts(this.categoryId,this.searchWord).subscribe(data=>{
      this.allProducts = data;
    })
  }
}
