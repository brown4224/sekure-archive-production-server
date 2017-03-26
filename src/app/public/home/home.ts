import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService, Folder } from '../../services/api';
import { UserService } from '../../services/user';

/** Any currently displayed messages. */
export class Flash {
  error: string = null;
  notification: string = null;
}

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  providers: [APIService]
})
export class Home implements OnInit {
  private working: boolean;
  private folders: Folder[];

  username: string = null;
  flash: Flash = new Flash();

  constructor(public router: Router, private api: APIService, private user: UserService) { }

  ngOnInit() {
    this.working = true;
    this.username = this.user.getUsername();
    // Load folders on page load
    this.api.getALLFolders().subscribe(folders => {
      this.folders = folders;
      this.working = false;
    }, error => {
      if (!this.user.isLoggedIn()) {
        this.router.navigate(['login']);
        var isExpired = this.user.isSessionExpired();
        if (isExpired){
          this.user.setSessionExpired();
        }
        console.log("Your out of time, please log in again")
      } else {
        this.working = false;
        this.flash.error = error;
      }
    });
  }

  private logout() {
    this.user.unsetUser();
    this.router.navigate(['login']);
  }
}
