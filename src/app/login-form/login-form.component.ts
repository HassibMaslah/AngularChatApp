import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
import * as jquery from 'jquery';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;
  users: User[];

  constructor(private authService: AuthService, private router: Router,chat: ChatService) {
    chat.getUsers().subscribe(users => {
      this.users = users;
    });

   }

   ngOnInit(){
  }
  login() {
    console.log('login() called from login-form component');
    this.authService.login(this.email, this.password)
    .catch(error => this.errorMsg = error.message);
     }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
