
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app/app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { CookieService } from 'ngx-cookie-service'



import { AppComponent } from './app.component';
import { LoginComponent } from './comps/login/login.component';
import { HomeComponent } from './comps/home/home.component';
import { ContactComponent } from './comps/contact/contact.component';
import { AdduserComponent } from './comps/adduser/adduser.component';
import { UserstatusComponent } from './comps/userstatus/userstatus.component';
import { MainComponent } from './shopcomp/main/main.component';
import { AllproductComponent } from './shopcomp/allproduct/allproduct.component';
import { MycartComponent } from './shopcomp/mycart/mycart.component';
import { ModalComponent } from './modal/modal.component';
import { ProductComponent } from './shopcomp/product/product.component';
import { CockpitComponent } from './adminComps/cockpit/cockpit.component';
import { AddprodComponent } from './adminComps/addprod/addprod.component';
import { SumodalComponent } from './shopcomp/sumodal/sumodal.component';
import { AddUserAdComponent } from './adminComps/add-user-ad/add-user-ad.component';
import { NeworderComponent } from './shopcomp/neworder/neworder.component';
import { AllordersComponent } from './adminComps/allorders/allorders.component';
import { NotfoundComponent } from './comps/notfound/notfound.component';
import { FinishmodalComponent } from './shopcomp/finishmodal/finishmodal.component';
import { ReciptComponent } from './shopcomp/recipt/recipt.component';
import { ApiComponent } from './comps/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ContactComponent,
    AdduserComponent,
    UserstatusComponent,
    MainComponent,
    AllproductComponent,
    MycartComponent,
    ModalComponent,
    ProductComponent,
    CockpitComponent,
    AddprodComponent,
    SumodalComponent,
    AddUserAdComponent,
    NeworderComponent,
    AllordersComponent,
    NotfoundComponent,
    FinishmodalComponent,
    ReciptComponent,
    ApiComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CreditCardDirectivesModule
       
    
  ],
  entryComponents: [ FinishmodalComponent ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
    