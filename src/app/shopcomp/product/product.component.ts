import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() prod: any;
  @Input() currentCartID: string;
  userType: any;
  constructor(private prodServ: ProductService) {}

  ngOnInit() {
    this.userType = JSON.parse(localStorage.getItem('connectedUser')).role;
  }

  deleteProd() {
    this.prodServ.deleteProd(this.prod.id_prod).subscribe(data => {
      this.prodServ.myProdEmitter.emit('delete!');
    });
  }

  toggleQuantityProd(ev: any) {
    const sentNewItem = {
      prod: this.prod,
      cart_id: this.currentCartID
    };

    const buttonMech = ev.classList[0];
    console.log(buttonMech);
    this.prodServ.checkProductInCart(sentNewItem.prod.id_prod, sentNewItem.cart_id).subscribe(dataQuantity => {
      if (dataQuantity.quantity !== 0) {
        // means that there is 1 or more products like that in the table db. you need to update the quantity
        switch (buttonMech) {
          case 'inc':
              dataQuantity.quantity = ++dataQuantity.quantity;
              break;
          case 'dec':
              dataQuantity.quantity = --dataQuantity.quantity;
              break;
          default:
            console.log('error!');
        }
        const updated = {sentNewItem, quantity: dataQuantity.quantity};
        this.prodServ.updateProductInCart(updated, sentNewItem.cart_id).subscribe(data => {
          alert(data.msg);
          this.prodServ.myProdEmitter.emit('updated!');
        });
      }
      else {
        this.prodServ.addProductToCart(sentNewItem).subscribe(data => {
          alert(data.msg);
          this.prodServ.myProdEmitter.emit('added!');
        });
      }
    });

  }


}
