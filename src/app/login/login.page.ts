import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public afAuth: AngularFireAuth, 
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router, ) {
      this.afAuth.user.subscribe(user => { 
        if (user) {
          this.router.navigate(['/'])
        }
      })
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(40),]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40),]]
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/'])
    }, err => {
      this.errorMessage = err.message;
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

  goRegisterPage() {
    this.router.navigate(['/register'])    
  }

}
