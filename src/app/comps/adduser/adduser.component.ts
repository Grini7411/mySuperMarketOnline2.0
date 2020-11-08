import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  allCity: any[] = [];

  addUserForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    idNum: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required])
  });

  constructor(private prodServ: ProductService, private userServ: UserService, private router: Router) { }

  ngOnInit() {
    this.prodServ.getAllCities().subscribe(data => {
     this.allCity = data;
    });
  }

  save() {
    if (this.addUserForm.valid) {
      this.userServ.addUserToDB(this.addUserForm.value).subscribe(data => {
        this.userServ.isConnected = true;
        this.userServ.userConnected = {...this.addUserForm.value};
        this.userServ.myEventEmitter.emit('new User in db');
        this.router.navigate(['/shop/main']);
      });
    }
  }

}
