import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  cartID:string = ""
  userType:any;
  constructor(private router:Router) {
   }


  ngOnInit() {
    let cartInfo = JSON.parse(localStorage.getItem('currentCart'))
    this.cartID = cartInfo.cartID; 
    this.userType = JSON.parse(localStorage.getItem('connectedUser')).role;
  }

  goToShop():void{
    this.router.navigate(['/shop/main'],{state:{cartID:this.cartID}});
  }
  goToAdmin():void{
    
    let role = JSON.parse(localStorage.getItem('connectedUser')).role
    
    if(role === 2){
      this.router.navigate(['/admin/cockpit']);
    }
    else{
      this.router.navigate(['/**'])
    }
    
  }

}
