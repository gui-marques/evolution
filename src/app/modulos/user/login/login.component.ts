import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servico/auth.service';


// Variable in assets/js/scripts.js file
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {


  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public authService: AuthService) { }

// tslint:disable-next-line: no-inferrable-types
public email: string = '';
// tslint:disable-next-line: no-inferrable-types
public password: string = '';

  ngOnInit() {
    }
onLogin(): void {

   // tslint:disable-next-line: align
   this.authService.loginEmailUser(this.email, this.password)
   .then((res) => {
     this.onLoginRedirect();
   }).catch(err => console.log('err', err.message));
 }
onLogout(){
  this.authService.logoutUser();
}
onLoginRedirect(){
  this.router.navigate(['/home']);
}
}
