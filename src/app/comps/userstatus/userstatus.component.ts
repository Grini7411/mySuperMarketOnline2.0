import { Component, OnInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userstatus',
  templateUrl: './userstatus.component.html',
  styleUrls: ['./userstatus.component.scss']
})
export class UserstatusComponent implements OnInit {

  username:string="Guest";
  isConnected:boolean = false;
  userConnected:any = {}
  

  constructor(private userServ:UserService, private router:Router) {

   }

   ngOnInit() {
     let connectedUser = JSON.parse(localStorage.getItem('connectedUser'))
     if(connectedUser !== null){
      if (connectedUser['id']) {
        this.username = `${connectedUser['first_name']} ${connectedUser['last_name']}`
        this.isConnected = true;
       }
     }
     else{
      this.userServ.myEventEmitter.subscribe(data=>{
      
        this.username = `${data.first_name} ${data.last_name}`
        this.isConnected = true;
     })
 
     }

  }
  logout(){
    localStorage.setItem('connectedUser', JSON.stringify({}))
    this.isConnected = false
    this.username = "Guest"

    this.router.navigate(['/login'])
    
    }
  }


  


