import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DropdownService } from '../../shared/services/dropdown.service';
import { EstadoBr } from '../../shared/models/estado-br.model';
import { ConsultaCepService } from '../../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { FormValidations } from '../../shared/form-validations';
import { VerificaEmailService } from './Service/verifica-email.service';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Cidade } from '../../shared/models/cidade';
import { AuthService } from '../servico/auth.service';
import { CadastroService } from './Service/cadastro.service';



@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  cidades: Cidade[];
  estados: EstadoBr[];
  authError: any;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService,
              private verificaEmailService: VerificaEmailService,
              private authService: CadastroService,

              ) { }
  ngOnInit() {

   // this.verificaEmailService.verificarEmail('email@email.com').subscribe();
   this.authService.eventAuthError$.subscribe( data => {
    this.authError = data;
  });

   this.dropdownService.getEstadosBr()
   .subscribe(dados => this.estados = dados);
// tslint:disable-next-line:triple-equals

    // tslint:disable-next-line: align
    this.formulario = this.formBuilder.group({
      razao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      fantasia: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      cnpj: [null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      token: [null, [Validators.required, Validators.minLength(8)]],
// tslint:disable-next-line:triple-equals
      endereco: this.formBuilder.group({
      cep: [null, [Validators.required, FormValidations.cepValidator]],
      num: [null, [Validators.required, Validators.maxLength(5)]],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, [Validators.required, Validators.maxLength(2)]],
    })
    });
      // tslint:disable-next-line:triple-equals
    // tslint:disable-next-line: align
    this.formulario.get('endereco.cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log ('status CEP:', value)),
      switchMap(status => status === 'VALID' ?
      this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
      // tslint:disable-next-line: deprecation
      : empty()
      )
    )
    .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
    // tslint:disable-next-line:max-line-length

    // tslint:disable-next-line: align

    // tslint:disable-next-line: align
    this.formulario.get('endereco.estado').valueChanges
    .pipe(
      tap(estado => console.log('Novo estado: ', estado)),
      map(estado => this.estados.filter(e => e.sigla === estado)),
      // tslint:disable-next-line: deprecation
      map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
      switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
      tap(console.log)
    )
    .subscribe(cidades => this.cidades = cidades);
}

createUser(formulario){

  this.authService.createrUser(formulario.value);
  this.resetar();
  alert('Empresa cadastrada com Sucesso');


}
  onSubmit(){
    console.log(this.formulario.value);
     // tslint:disable-next-line: align
     if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))

    .subscribe(dados => {
      this.resetar();



    },
    (error: any) => alert('Erro'));

  } else{
    console.log('Formulario inválido');
    this.verificaValidacoesForm(this.formulario);
  }
    }
    verificaValidacoesForm(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(campo => {
        console.log(campo);
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        if (controle instanceof FormGroup) {
          this.verificaValidacoesForm(controle);
        }
      });

    }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string){
    return ( !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }
  verificaValidRequired(campo: string){
    return (
     this.formulario.get(campo).hasError('required') &&
    (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }


  verificaEmailInvalido() {
    // tslint:disable-next-line: prefer-const
    let campoEmail = this.formulario.get('email');
    if (campoEmail.errors){
      // tslint:disable-next-line: no-string-literal
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  verificaCnpjInvalido() {
    // tslint:disable-next-line: prefer-const
    let campoCnpj = this.formulario.get('cnpj');
    if (campoCnpj.errors){
      // tslint:disable-next-line: no-string-literal
      return campoCnpj.errors['cnpj'] && campoCnpj.touched;
    }
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  consultaCEP() {
    // tslint:disable-next-line: prefer-const
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados){
    this.formulario.patchValue({
      endereco: {
        num: dados.gia,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf

      }
    });
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {

        num: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null

      }
    });
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste ? {emailInvalido: true } : null));
  }
}
