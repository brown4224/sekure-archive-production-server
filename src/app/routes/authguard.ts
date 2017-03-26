import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UserService } from '../services/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private user: UserService) { }

  canActivate() {
    // Reroute to login form if no user is logged in
    if (this.user.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}
