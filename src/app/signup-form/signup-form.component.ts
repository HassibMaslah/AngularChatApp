import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Upload } from '../uploads/shared/upload';
import { UploadService } from '../uploads/shared/upload.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  email: string;
  password: string;
  displayName: string;
  country: string;
  errorMsg: string;
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  currentUpload: Upload;

  constructor(private authService: AuthService, private router: Router,private upSvc: UploadService) { }

  signUp() {
    const email = this.email;
    const password = this.password;
    const country = this.country;
    const displayName = this.displayName;
    this.authService.signUp(email, password,country, displayName)
      .then(resolve => this.router.navigate(['chat']))
      .catch(error => this.errorMsg = error.message);
  }
  upload() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
}
