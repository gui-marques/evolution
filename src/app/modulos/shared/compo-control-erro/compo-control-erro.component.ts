import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compo-control-erro',
  templateUrl: './compo-control-erro.component.html',
  styleUrls: ['./compo-control-erro.component.css']
})
export class CompoControlErroComponent implements OnInit {

  @Input() msgErro: string;
  @Input() mostrarErro: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
