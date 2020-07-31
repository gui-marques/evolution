import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminPainel1Component } from './admin-painel1/admin-painel1.component';
import { AdminPainel2Component } from './admin-painel2/admin-painel2.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.modulo';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';









@NgModule({
  imports:  [
    CommonModule,
    AdminRoutingModule,
    FormsModule
   ],

  declarations: [
    AdminPainel1Component,
    AdminPainel2Component,
    AdminComponent,


],
exports:[AdminComponent]


})
export class AdminModule { }
