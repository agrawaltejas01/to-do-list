import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { AppPanelModule } from "./app-panel/app-panel.module"
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppPanelModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
