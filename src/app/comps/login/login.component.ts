import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userServ:UserService, private prodServ:ProductService, private router:Router, private activeRoute:ActivatedRoute) { }

  loginForm = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })
  cartID:string = ""
  currentCart:any[] = []

  ngOnInit() {
    
    let connectedUser:any = localStorage.getItem('connectedUser')
    if(connectedUser !== "{}" && connectedUser !== null){
      this.router.navigate(['/home'])
    }
    
  }
  login():void{
    if(this.loginForm.valid){
      this.userServ.checkUserLogin(this.loginForm.value).subscribe(data =>{
        if(data.success == true){
          let newCartObj = {
            client: data.userConnected,
            time:new Date()
          }
          this.userServ.userConnected = newCartObj.client;
          this.userServ.myEventEmitter.emit(newCartObj.client)
          localStorage.setItem('connectedUser', JSON.stringify(data.userConnected))
          
          
          //check if a cart exists
          this.prodServ.checkCart(data.userConnected.id_num).subscribe(data2=>{
            //if it doesnt exists crate a new cart and assign cartID to be its cart id:
            if(data2.msg == '404'){
              this.prodServ.createCart(newCartObj).subscribe(newCartData =>{
                localStorage.setItem('currentCart',JSON.stringify(newCartData))
                this.cartID = newCartData.cartID;
                this.router.navigate(['/home'],{state:{cartID:this.cartID}});
              })
            }
            //if it exists get all items inside the cart to the array:
            else{
              this.cartID = data2[0].id;
              
              this.prodServ.getCartUnits(this.cartID).subscribe(currentCartUnitsData=>{
                this.currentCart = currentCartUnitsData;
                this.router.navigate(['/home'],{state:{cartID:this.cartID}});
              })
            }
          })
        }
      })
    }
    else{
      alert('Form is not Valid!!')
    }
    
  }

}
