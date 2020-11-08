import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-ad',
  templateUrl: './add-user-ad.component.html',
  styleUrls: ['./add-user-ad.component.scss']
})
export class AddUserAdComponent implements OnInit {

  addUserAdminForm = new FormGroup({
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    idNum: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    street: new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required]),
    userType: new FormControl(null,[Validators.required])
  })

  allCity:string[] = []
  allTypes: string[] = [];
  constructor(private prodServ:ProductService, private userServ:UserService, private router:Router) { }

  ngOnInit() {
    this.prodServ.getAllCities().subscribe(data=>{
      this.allCity = data;
    })

    this.userServ.downloadTypes().subscribe(data=>{
      this.allTypes = data;
    })
    
  }
  save(){
    if(this.addUserAdminForm.valid){
      this.userServ.addUserToDB(this.addUserAdminForm.value).subscribe(data=>{
        this.userServ.myEventEmitter.emit('newuser!');
      })
    }
  }
  backToCockpit(){
    this.router.navigate(['/admin/cockpit'])
  }

}
