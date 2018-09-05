import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Upload } from '../uploads/shared/upload';
import { UploadService } from '../uploads/shared/upload.service';
import { AuthService } from '../services/auth.service';
import { MessageFile } from '../messageFile/messageFile.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: FirebaseListObservable<ChatMessage[]>;
  //fileUploads: FirebaseListObservable<Upload[]>;
  fileUploads: any[];
  messageContent: string;
  isOwnMessage: boolean;
  ownEmail: string;
  userEmail: string;
  
  constructor(private chat: ChatService,private UploadService:UploadService,private authService: AuthService) { 
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit() {
    this.feed = this.chat.getCurentMessages();
  //  this.fileUploads=this.UploadService.getFileUploads({limitToLast:6});
   // Use snapshotChanges().map() to store the key
   this.UploadService.getFileUploads(6).snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  }).subscribe(fileUploads => {
    this.fileUploads = fileUploads;
  });
  }

  ngOnChanges() {
    this.feed = this.chat.getCurentMessages();

    this.UploadService.getFileUploads(6).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}