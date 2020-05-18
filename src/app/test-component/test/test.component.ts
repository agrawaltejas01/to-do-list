import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../store/service/user.service'
import { userSchema } from 'src/app/store/schema/user-schema';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit 
{
  user : userSchema;

  constructor(private userService : UserService) 
  { 

  }

  ngOnInit(): void 
  {
    this.userService.findUser("Tejas").subscribe(data =>
      {
        this.user = data
      })
  }

}
