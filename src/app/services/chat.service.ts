import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  items: FirebaseListObservable<ChatMessage[]>;

private emailSource=new BehaviorSubject<string>('');
currentEmail=this.emailSource.asObservable();

  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(auth => {
              if (auth !== undefined && auth !== null) {
                this.user = auth;
              }

              this.getUser().subscribe(a => {
                this.userName = a['displayName'];
              });
        });
  }

   changeEmail(email:string){
    console.log('changeEmail() email is:'+email);
     this.emailSource.next(email);
   } 

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }
  
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email });
  }

  getMessages(): FirebaseListObservable<ChatMessage[]> {
      return this.db.list('/messages');
    }

  getFirstMessages(email): FirebaseListObservable<ChatMessage[]>{
  // const email="ala@outlook.fr";
      console.log('getFirstMessages() email is:'+email);
      let query=<any>{};
      query.orderByChild='reciverEmail';
      query.equalTo=email;
      console.log(query);
      const list=this.db.list('/messages',{query:query});
      //affiche dans le console
      list.forEach(message => {
        console.log('Message:', message);
    });
    return list;
  }
 
getCurentMessages(): FirebaseListObservable<ChatMessage[]>{
    //console.log('getCurentMessages() email is:'+email2);
    let query=<any>{};
   // query.orderByChild='reciverEmail';
    //query.equalTo=email2;
   // console.log(query);
    query.limitToLast=25;
    const list=this.db.list('/messages',{query:query});
    //affiche dans le console
  list.forEach(message => {
      console.log('Message:', message);
  });
  return list;
  }

  getLastMessages(email3):  FirebaseListObservable<ChatMessage[]> {
  //return this.db.list('/messages');
  let query=<any>{};
  let query2=<any>{};
  query.orderByChild='reciverEmail';
  //query2.orderByChild='email';
  query.equalTo=email3;
 //query2.equalTo=email3;
  query.limitToLast=1;
  //query2.limitToLast=1;
  console.log(query);
 // console.log(query2);
  const list=this.db.list('/messages',{query:query});//&&query2});
  return list;
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' +
                 (now.getMonth() + 1) + '/' +
                 now.getDate();
    const time = now.getHours() + ':' +
                 now.getMinutes() + ':' +
                 now.getSeconds();

    return (date + ' ' + time);
  }
}
