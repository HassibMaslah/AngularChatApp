import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
import { ChatMessage } from '../models/chat-message.model';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-item-online',
  templateUrl: './user-item-online.component.html',
  styleUrls: ['./user-item-online.component.css']
})
export class UserItemOnlineComponent implements OnInit {
  users: any[];
  @Input() user: User;

  constructor(private authService: AuthService, private router: Router,private chat: ChatService) {
  }

  ngOnInit() {
  }
  goChatWith() {
    console.log('goChatWith() called from user-item-online component');
    
  }
}
