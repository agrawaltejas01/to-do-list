import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { PanelComponent } from './app-panel/panel/panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterationComponent } from './authentication/registeration/registeration.component';



const routes: Routes = [  
  
  {
    path : "register",
    component : RegisterationComponent
  },

  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "**",
    component : PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
