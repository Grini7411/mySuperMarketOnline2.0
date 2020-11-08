import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  searchWord:String;
  userID:string = '';
  currentCartID:String;
  change:boolean = false;

  constructor(private userServ:UserService,private prodServ:ProductService, private router:Router) { }
  ngOnInit() {

    this.currentCartID = JSON.parse(localStorage.getItem('currentCart')).cartID;
    this.userID = JSON.parse(localStorage.getItem('connectedUser')).id_num;
  }
  gotoHome(){
    this.router.navigate(['/home'])
  }

}
