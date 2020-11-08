import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

 import { Cloudinary } from '@cloudinary/angular-5.x';
 import { MDBModalRef } from 'angular-bootstrap-md';
import { callbackify } from 'util';
//  import * as cloudinary1 from 'https://widget.cloudinary.com/v2.0/global/all.js';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.scss']
})
export class AddprodComponent implements OnInit {


  name:string;
  category:number;
  pic_url:string;
  price:number;
  myWidget:any;


  allCategories:string[]=[];



  constructor(private prodServ:ProductService,public addFormModalRef: MDBModalRef) { }

  ngOnInit() {
    this.prodServ.getCategory().subscribe(data=>{
      this.allCategories=data;
    })

    // @ts-ignore
    var myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'dxyrc1vmi', 
        uploadPreset: 'rmjvy2h4'
      }, (error, result) => { 
        if (!error && result && result.event === "success") { 
          this.pic_url = result.info.secure_url;
        }
      }
    )

    this.myWidget = myWidget
      
    document.getElementById("upload_widget").addEventListener("click", function() {
      myWidget.open();
    }, false);


    
  }

  saveProd():void{
    let sendObj={
      name:this.name,
      cat_id:this.category,
      picture:this.pic_url,
      price:this.price
    }
    
    this.prodServ.addProductToDB(sendObj).subscribe(data=>{
      this.prodServ.myProdEmitter.emit('bla!');
    })
    this.addFormModalRef.hide();


  }

}
