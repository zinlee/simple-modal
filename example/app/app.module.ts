import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalModule } from 'src';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    ModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
