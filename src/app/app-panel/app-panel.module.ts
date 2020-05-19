import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { UserService } from '../store/service/user.service';

// Component
import { PanelComponent } from './panel/panel.component';


@NgModule({
  declarations: 
  [
    PanelComponent
  ],

  imports: 
  [
    CommonModule,
    HttpClientModule
  ],

  exports : 
  [
    PanelComponent
  ],

  providers :
  [
    UserService
  ]
})
export class AppPanelModule { }
