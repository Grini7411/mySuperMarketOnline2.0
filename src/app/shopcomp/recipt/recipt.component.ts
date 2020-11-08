import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.scss']
})
export class ReciptComponent implements OnInit,OnDestroy {
  
  tableHeaders:String[] = ["#","Product Name","Quantity","Price"];
  cartUnits:any[]
  totalPrice:any;
  orderID:String;
  

  constructor(private userServ:UserService,private orderServ:OrderService,private prodServ:ProductService, private router:Router) { }

  ngOnInit() {
    this.cartUnits = this.orderServ.cartUnits;
    this.totalPrice = this.orderServ.totalPrice;
    this.orderID = JSON.parse(localStorage.getItem('orderID'));
  }

  printRecipt(){
    window.print();
  }

  downloadPDF()
  {

    var node = document.getElementById('down');

    var img;
    var filename;
    var newImage;


    domtoimage.toPng(node, { bgcolor: '#fff' })

      .then(function(dataUrl) {

        img = new Image();
        img.src = dataUrl;
        newImage = img.src;

        img.onload = function(){

        var pdfWidth = img.width;
        var pdfHeight = img.height;

          // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

          var doc;

          if(pdfWidth > pdfHeight)
          {
            doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
          }
          else
          {
            doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
          }


          var width = doc.internal.pageSize.getWidth();
          var height = doc.internal.pageSize.getHeight();


          doc.addImage(newImage, 'PNG',  10, 10, width, height);
          filename = 'mypdf_' + '.pdf';
          doc.save(filename);

        };
      })
      .catch(function(error) {

       // Error Handling

      });
    }



  makeNewOrder(){
    let newCartObj = {
      client:JSON.parse(localStorage.getItem('connectedUser')),
      time:new Date()
    }
    this.prodServ.createCart(newCartObj).subscribe(newCartData =>{
      localStorage.setItem('currentCart',JSON.stringify(newCartData))
      this.userServ.myEventEmitter.emit(newCartObj.client)
      this.router.navigate(['/shop/main']);
  })
}

  ngOnDestroy(): void {
    localStorage.removeItem('orderID');
  }
}
