import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(
    private afsAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
   ) { }

  createrUser(user) {
    this.afsAuth.createUserWithEmailAndPassword( user.email, user.password)
   .then( userCredential => {
   this.newUser = user;

   userCredential.user.updateProfile( {
     displayName: user.email + ' ' + user.nome
   });

   this.insertUserData(userCredential)
     .then(() => {

       this.router.navigate(['/registro']);
     });

 }).catch( error => {

   this.eventAuthError.next(error);
 });
  }

  insertUserData( userCredential: firebase.auth.UserCredential) {

    return this.db.doc(`Empresa/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      password: this.newUser.password,
      razao: this.newUser.razao,
      fantasia: this.newUser.fantasia,
      cnpj: this.newUser.cnpj,
      nome: this.newUser.nome,
      token: this.newUser.token,
// tslint:disable-next-line:triple-equals
/*
  cep: this.newUser.cep,
  num: this.newUser.num,
  rua: this.newUser.rua,
  bairro: this.newUser.bairro,
  cidade: this.newUser.cidade,
  estado: this.newUser.estado,

*/
    });
  }
}
