import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnChanges {
  title = 'Super Market Online!';


  userConnected:any;
  routeDirection:String;
  constructor(private router:Router, private userServ:UserService){}

  ngOnInit(): void {
    this.userServ.myEventEmitter.subscribe(data=>{
      this.userConnected = data;
    })
    
    
    if(localStorage.getItem('connectedUser')){
      this.routeDirection = '/home'
    }
    else{
      this.userConnected = false
      this.routeDirection = '/login'
    }
  }
  gotoHome(){
    this.router.navigate(['/home'])
  }

  ngOnChanges(){
    
  }

}
