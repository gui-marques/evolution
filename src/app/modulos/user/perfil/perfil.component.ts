import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../servico/auth.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  authError: any;

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private router: Router
              ) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit(){
    this.authService.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }
  onUpload(e){
    console.log('UpLoad', e);
    console.log('button');
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `Perfil/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  onAddUser(){
     this.authService.eventAuthError$.subscribe( data => {
       this.authError = data;
       console.log('onAddUser');
     });
  }
}
