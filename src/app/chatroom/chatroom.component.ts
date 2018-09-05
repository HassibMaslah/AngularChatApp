import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(102%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideBtnInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(750%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  email:string;
  click:boolean;
  menuState:string = 'out';
  BtnState:string = 'out';
  user: Observable<firebase.User>;
  userEmail:string;
  fileUploads: any[];

  constructor(private chat: ChatService,private UploadService:UploadService,private authService: AuthService) { 
    this.click=false;
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
          this.userEmail = user.email;
          console.log("this.userName in chatroomConstructor: "+this.userEmail);
      }
    });
  }
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.BtnState = this.BtnState === 'out' ? 'in' : 'out';
  }
  ngOnInit() {
    this.chat.currentEmail.subscribe(email =>this.email= email);
    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user) {
          this.userEmail = user.email;
      }
    });
    console.log("this.userName in chatroomNGONINIT: "+this.email);
    this.UploadService.getFileUploadsPP(this.email).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(fileUploads => {this.fileUploads = fileUploads;});
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  clicked(){
    this.click=true;
  }
  clicked2(){
    this.click=true;
  }
}
