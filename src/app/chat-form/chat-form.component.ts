import { Component, OnInit ,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatService } from '../services/chat.service';
import { FeedComponent } from '../feed/feed.component';
import { Upload } from '../uploads/shared/upload';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  reciEmail:string;
  email:string;
  selectedFiles: FileList;
  currentUpload: Upload;
  
  constructor(private chat: ChatService,private feed:FeedComponent,private upSvc: UploadService) { 
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }

  ngOnInit() { 
  }

  focusFunction(){
    console.log('its focusing now !! ');
  }

  send() {
    if( !( (this.message=="") ) ){
      this.chat.sendMessage(this.message);
      this.message = '';
    }
    else 
    console.log('Message Empty !');
  }
  handleSubmit(event,recEmail) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}


