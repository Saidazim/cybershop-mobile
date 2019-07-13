import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public afAuth: AngularFireAuth, 
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router, ) { 
      this.afAuth.user.subscribe(user => { 
        console.log(user, 'USER');
        if (user) {
          this.router.navigate(['/'])
        }
      })
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(40),]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),]]
    });
  }

  tryRegister(value){
    this.authService.doRegister(value)
     .then(res => {
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in now.";
      this.router.navigate(['/'])
     }, err => {
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then((res) => {
      this.router.navigate(['/'])
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then((res) => {
      this.router.navigate(['/'])
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  goLoginPage(){
    this.router.navigate(['/login'])    
  }
}
