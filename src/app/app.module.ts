import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from './authentication/authentication.module';


// Modules
import { AppPanelModule } from "./app-panel/app-panel.module"

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
      FormsModule,
      AuthenticationModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
