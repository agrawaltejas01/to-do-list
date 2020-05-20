import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { routes } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer/task-reducer'; 

// Modules
import { AppPanelModule } from "./app-panel/app-panel.module"
import { from } from 'rxjs';

@NgModule({
  declarations: 
  [
    AppComponent
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    AppPanelModule,  
    StoreModule.forRoot({
      task : reducer
    })  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
