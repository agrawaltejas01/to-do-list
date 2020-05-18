import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';

// Service
import { UserService } from '../store/service/user.service'


// Components
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: 
  [
    TestComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,
  ],

  exports : 
  [
    TestComponent,
  ],

  providers :
  [
    UserService,
  ]
})
export class TestComponentModule { }
