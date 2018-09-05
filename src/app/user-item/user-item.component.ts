import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
import { ChatMessage } from '../models/chat-message.model';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AuthService } from '../services/auth.service';
import { ChatroomComponent } from '../chatroom/chatroom.component';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  lastmessages:FirebaseListObservable<ChatMessage[]>;
  @Input() user: User;
  user2: Observable<firebase.User>;
  userEmail: string;
  constructor(private chat: ChatService,private auth:AuthService,private chatroom:ChatroomComponent) {}

  ngOnInit() {
    this.user2 = this.auth.authUser();
    this.user2.subscribe(user2 => {
      if (user2) {
          this.userEmail = user2.email;
      }
    });

  }
}
