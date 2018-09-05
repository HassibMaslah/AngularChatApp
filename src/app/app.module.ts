import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserItemOnlineComponent } from './user-item-online/user-item-online.component';
import { MessageFile } from './messageFile/messageFile.component';



import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

import { appRoutes } from '../routes';
import { environment } from '../environments/environment';

import { UploadService } from './uploads/shared/upload.service';
import { Upload } from './uploads/shared/upload';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserProfilComponent } from './Profile/user-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageFile,
    ChatFormComponent,
    ChatroomComponent,
    UserProfilComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    UserItemOnlineComponent,
  ],
  imports: [
    InfiniteScrollModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [UploadService,AuthService, ChatService,AngularFireAuth, AngularFireDatabase,ChatFormComponent,FeedComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
