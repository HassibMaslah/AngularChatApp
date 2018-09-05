import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';
import { Upload } from '../uploads/shared/upload';

@Component({
  selector: 'app-message-file',
  templateUrl: './messageFile.component.html',
  styleUrls: ['./messageFile.component.css']
})
export class MessageFile implements OnInit {

  @Input() upload: Upload;
  userEmail: string;
  userName: string;
  fileURL: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit(Upload = this.upload) {
    this.fileURL=this.upload.url;
    this.userName = this.upload.username;
    this.userEmail = this.upload.useremail;
   console.log(this.userName);
  }
}
