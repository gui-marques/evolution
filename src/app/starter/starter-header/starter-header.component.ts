import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modulos/user/servico/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }
  // tslint:disable-next-line: no-inferrable-types
  public isLogged: boolean = true;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth){
        console.log('Usuario Logado');
        this.isLogged = true;
      } else{
        console.log('Usuario não logado');
        this.isLogged = false;
      }
    });
  }
  onLogout(){
    this.authService.logoutUser();
  }

}
