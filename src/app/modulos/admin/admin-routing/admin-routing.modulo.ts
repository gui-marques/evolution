import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AdminComponent } from './../admin.component';
import { AdminPainel1Component } from '../admin-painel1/admin-painel1.component';
import { AdminPainel2Component } from '../admin-painel2/admin-painel2.component';
import { Page404Component } from '../../page404/page404.component';



@NgModule({
  imports: [
    RouterModule.forChild([
       {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'painel-admin',
            pathMatch: 'full'
          },
          {
            path: 'painel-admin',
            component: AdminPainel1Component
          },
          {
            path: 'painel',
            component: AdminPainel2Component
          },

          {path: '**', component: Page404Component}
          ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
