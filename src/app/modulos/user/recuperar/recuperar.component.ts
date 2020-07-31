import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servico/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  authError: any;



  constructor(private authService: AuthService, private storage: AngularFireStorage) { }


  ngOnInit() {
     this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    });

  }

  createUser(formulario){
    this.authService.createrUser(formulario.value);

  }


}
