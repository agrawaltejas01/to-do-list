import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { AppComponent } from './app.component';
import { PanelComponent } from './app-panel/panel/panel.component';
import { AddTaskComponent } from './app-panel/add-task/add-task.component';
import { LoginComponent } from './authentication/login/login.component';



const routes: Routes = [  
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
