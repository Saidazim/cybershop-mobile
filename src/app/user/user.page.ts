import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  currentUser

  constructor(
    public afAuth: AngularFireAuth, 
    public authService: AuthService,
    private router: Router, ) {
    this.afAuth.user.subscribe(user => {
      this.currentUser = user
      if (!this.currentUser) {
        this.router.navigate(['/'])
      }
    })
    }

  ngOnInit() {
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/'])
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
