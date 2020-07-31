import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CompoControlErroComponent } from './compo-control-erro/compo-control-erro.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from './error-msg/error-msg.component';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormDebugComponent, CompoControlErroComponent, ErrorMsgComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [FormDebugComponent, CompoControlErroComponent, ErrorMsgComponent],
  providers: [DropdownService]
})
export class SharedModule { }
