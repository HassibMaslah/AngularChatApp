import { Injectable, Query } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { DatabaseReference, DatabaseQuery } from 'angularfire2/database-deprecated/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UploadService {
  user: firebase.User;
  userName: string;
  useremail:string;
  private basePath:string = '/uploads';
  private basePathPP:string = '/uploadPP';
  uploads: FirebaseListObservable<Upload[]>;
  fileUploads: FirebaseListObservable<Upload[]>;

  constructor( private db: AngularFireDatabase,private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
     /* this.getUser().subscribe(a => {
        this.userName = a['displayName'];
      });
     */
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a['displayName'];
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }
  pushUploadPP(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePathPP}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      // upload in progress
      upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        upload.username=this.userName;
        upload.useremail=this.user.email;
        this.saveFileDataPP(upload)
      }
    );
  }
 // Writes the file details to the realtime db
 private saveFileDataPP(upload: Upload) {
  this.db.list(`${this.basePathPP}/`).push(upload);
}
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      // upload in progress
      upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        upload.username=this.userName;
        upload.useremail=this.user.email;
        this.saveFileData(upload)
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  /*getFileUploads(query = {}) {
    this.fileUploads = this.db.list(this.basePath, {query: query});
    return this.fileUploads
  }*/
  getFileUploads(numberItems): AngularFireList<Upload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  getFileUploadsPP(email:string): AngularFireList<Upload> {
    console.log("email in getuplodpp(): "+email);
    return this.db.list(this.basePathPP, ref =>
      ref.orderByChild('useremail').equalTo(email).limitToLast(1));    
  }

}
