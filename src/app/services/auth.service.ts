import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
  ) { }

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
  }

  doLogout(){
   return new Promise((resolve, reject) => {
     if(firebase.auth().currentUser){
       this.afAuth.auth.signOut()
       resolve();
     }
     else {
       reject();
     }
   });
  }

  doGoogleLogin(){
     return new Promise<any>((resolve, reject) => {
         this.afAuth.auth
         .signInWithPopup(new firebase.auth.GoogleAuthProvider())
         .then((user) => {
            resolve()
         },(err) => {
          reject(err);
        })
     })
   }

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(result => {
          //Default facebook img is too small and we need a bigger image
          var bigImgUrl = "https://graph.facebook.com/" + result.additionalUserInfo.profile + "/picture?height=500";
          // update profile to save the big fb profile img.
          firebase.auth().currentUser.updateProfile({
            displayName: result.user.displayName,
            photoURL: bigImgUrl
          }).then(res => resolve()
          ,(err) => {
            reject(err);
          });
        },(err) => {
          reject(err);
        })
    })
  }
}
