import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../services/api';
import { UserService } from '../../services/user';
import { Socket } from '../../services/socket';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [APIService, Socket]
})
export class Login implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  private showLogin: boolean;
  private working: boolean;
  private usernameError: string;
  private passwordError: string;



  constructor(public router: Router, private api: APIService, private user: UserService, private io: Socket) {
    this.showLogin = true;
    this.working = false;
    this.usernameError = null;
    this.passwordError = null;
  }

  ngOnInit() {
  // this.connection = this.io.getMessages().subscribe(message => {
  //   console.log("sending message over socket");
  //   this.messages.push(message);
  // })
  //
  // this.io.sendMessage("Test Message");


    if (this.user.isLoggedIn()) {
      this.router.navigate(['home']);
    } else if (this.user.isSessionExpired()) {
      this.passwordError = 'Your session has expired.';
      this.user.resetSessionExpired();
    }
  }




  // private toggleLogin() {
  //   // If an API call is in progress, ignore the button press.
  //   if (this.working) return;
  //
  //   this.showLogin = !this.showLogin;
  //   // Reset the form
  //   this.username.nativeElement.value = '';
  //   this.password.nativeElement.value = '';
  //   this.usernameError = null;
  //   this.passwordError = null;
  // }

  submitForm() {
    // If an API call is in progress, ignore the button press.
    if (this.working) return;

    let username = this.username.nativeElement.value;
    let password = this.password.nativeElement.value;
    // if (this.showLogin) {
    this.working = true;

    this.io.authenticate(username, password);
      // this.login(username, password);
    // } else {
    //   this.signup(username, password);
    // }
  }

  // private login(username: string, password: string) {
    // this.working = true;
    // this.io.sendMessage(username, password);




    // this.api.userLogin(username, password)
    //   .subscribe(data => {
    //     this.user.setUser(username, data.jwt);
    //     this.router.navigate(['home']);
    //   }, err => {
    //     this.passwordError = err;
    //     this.working = false;
    //   });
  // }

  // private signup(username: string, password: string) {
  //   // Client-side check of username and password
  //   if (username.length == 0) {
  //     this.usernameError = 'Username must not be empty.';
  //   } else {
  //     this.usernameError = null;
  //   }
  //   if (password.length < 8) {
  //     this.passwordError = 'Password must be at least 8 characters long.';
  //   } else if (password.length > 72) {
  //     this.passwordError = 'Password must be no more than 72 characters long.';
  //   } else {
  //     this.passwordError = null;
  //   }
  //
  //   // Attempt to register if the username and password seem to be OK
  //   if (this.usernameError == null && this.passwordError == null) {
  //     this.working = true;
  //     this.api.userAdd(username, password)
  //       .subscribe(data => {
  //         this.user.setUser(username, data.jwt);
  //         this.router.navigate(['home']);
  //       }, err => {
  //         this.usernameError = err;
  //         this.working = false;
  //       });
  //   }
  // }
}
