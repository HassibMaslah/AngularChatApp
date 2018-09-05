import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import * as jquery from 'jquery';
import * as $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Upload } from '../uploads/shared/upload';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit{
  @Input() user: User;
  @Input() upload: Upload;
  users: User[];
  errorMsg: string;
  userC:any;
  user2: Observable<firebase.User>;
  userEmail: string;
  userName:string;
  userId:string;
  email: string;
  password: string;
  name:string;
  selectedFiles: FileList;
  currentUpload: Upload;
  fileURL: string;

  constructor(private chat: ChatService,private auth:AuthService,private upSvc: UploadService,private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
    chat.getUsers().subscribe(users => {
      this.users = users;
    });
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a['displayName'];
      });
    });
  }

  ngOnInit(Upload = this.upload) {
    this.user2 = this.auth.authUser();
    this.user2.subscribe(user2 => {
      if (user2) {
          this.userEmail = user2.email;
          this.userName=user2.displayName;
          this.userId=user2.uid;
      }
    }); 
   
    this.fileURL=this.upload.url;
    console.log('fileURL::::: '+this.fileURL );
    this.userName = this.upload.username;
    this.userEmail = this.upload.useremail;
  }
  getUser() {
    const userId = this.user.uid;
    console.log('userId '+userId );
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

Edit(){
  console.log('EditUserData() called from User-profile component');
  if(this.name==''){
  alert("name empty !");
  }else{
  this.auth.edit(this.userEmail,this.name,this.userId);
  alert("You just edit your DisplayName !");
  }
}
uploadPP() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.upSvc.pushUploadPP(this.currentUpload)
}
detectFiles(event) {
  this.selectedFiles = event.target.files;
}
}
