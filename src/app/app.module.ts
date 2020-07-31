import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line: quotemark

import { PerfilComponent } from './modulos/user/perfil/perfil.component';
import { RecuperarComponent } from './modulos/user/recuperar/recuperar.component';
import { Page404Component } from './modulos/page404/page404.component';
import { AdminModule} from './modulos/admin/admin.module';



import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { DataFormModule } from './modulos/user/data-form/data-form.module';
import { SharedModule } from './modulos/shared/shared.module';
import { LoginComponent } from './modulos/user/login/login.component';
import { StarterComponent } from './starter/starter.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterControlSideComponent } from './starter/starter-control-side/starter-control-side.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { IonicModule } from '@ionic/angular';






@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    RecuperarComponent,
    Page404Component,
    LoginComponent,
    StarterComponent,
    StarterFooterComponent,
    StarterHeaderComponent,
    StarterControlSideComponent,
    StarterLeftSideComponent,
    StarterContentComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataFormModule,
    SharedModule,
    IonicModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
