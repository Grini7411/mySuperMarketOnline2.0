import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comps/login/login.component';
import { ContactComponent } from './comps/contact/contact.component';
import { HomeComponent } from './comps/home/home.component';
import { AdduserComponent } from './comps/adduser/adduser.component';
import { MainComponent } from './shopcomp/main/main.component';
import { CockpitComponent } from './adminComps/cockpit/cockpit.component';
import { AddprodComponent } from './adminComps/addprod/addprod.component';
import { AddUserAdComponent } from './adminComps/add-user-ad/add-user-ad.component';
import { AllproductComponent } from './shopcomp/allproduct/allproduct.component';
import { NeworderComponent } from './shopcomp/neworder/neworder.component';
import { AllordersComponent } from './adminComps/allorders/allorders.component';
import { NotfoundComponent } from './comps/notfound/notfound.component';
import { ReciptComponent } from './shopcomp/recipt/recipt.component';
import { ApiComponent } from './comps/api/api.component';


const routes: Routes = [
{path:"", redirectTo:"login",pathMatch:"full"},
{path:"login", component:LoginComponent} ,
{path:"shopping/api", component:ApiComponent},
{path:"home", component:HomeComponent},
{path:"register",component:AdduserComponent},
{path:"shop/main",component:MainComponent},
{path:"admin/cockpit",component:CockpitComponent},
{path:"admin/newprod",component:AddprodComponent},
{path:"admin/adduser",component:AddUserAdComponent},
{path:"admin/allprods",component:AllproductComponent},
{path:"admin/allorders",component:AllordersComponent},
{path:"shop/neworder",component:NeworderComponent},
{path:"shop/print",component:ReciptComponent},
{path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
