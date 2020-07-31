import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  @ViewChild('imageUser') inputImageUser: ElementRef;


  constructor(
    private afsAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }


 createrUser(user) {
   this.afsAuth.createUserWithEmailAndPassword( user.email, user.password)
  .then( userCredential => {
  this.newUser = user;
  console.log(userCredential);
  userCredential.user.updateProfile( {
    displayName: user.email + ' ' + user.nome,
    photoURL: this.inputImageUser.nativeElement.value
  });

  this.insertUserData(userCredential)
    .then(() => {
      console.log('/home');
      this.router.navigate(['/home']);
    });

}).catch( error => {
  console.log(error);
  this.eventAuthError.next(error);
});
 }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
    this.afsAuth.signInWithEmailAndPassword(email, pass)
    .then( userData => resolve(userData),
    err => reject(err));
  });
  }
  logoutUser() {
    return this.afsAuth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));

  }
  insertUserData( userCredential: firebase.auth.UserCredential) {

    return this.db.doc(`Admin/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      password: this.newUser.password,
      nome: this.newUser.nome,
      cnpj: this.newUser.cnpj,
      imageUser: this.newUser.imageUser,
      role: 'network user'

    });
  }
}
