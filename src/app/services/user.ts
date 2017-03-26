/// <reference path="../../../typings/modules/jwt-decode/index.d.ts" />
import * as jwt from 'jwt-decode';
import { Injectable } from '@angular/core';
// import { CookieService } from 'angular2-cookie';
import { CookieService } from 'angular2-cookie/core';
const JWT_KEY: string = 'session';

// Cookies dont work on S3, CORS strips them

/** A service that manages the currently logged in user. */
@Injectable()
export class UserService {
  /** The username of the currently logged in user, if any. */
  private username: string;
  private cookieExpires: number;  // hours before expires
  private cookieHTTPS: boolean;




  constructor(private cookie: CookieService) {
    this.cookieExpires = 1;  //Expire in an hour
    this.cookieHTTPS = false;  // Needs to be true for https
    this.username = null;
  }



  public setUser(username: string, jwt: string) {
    var temp = new Date().getTime() + this.cookieExpires * 3600 * 1000;  //hour is 3600
    var date = new Date(temp);
    let key = 'testCookieKey';
    let value = 'jwt';

    let opts: CookieOptionsArgs = {
      path: './services/user',
      domain: 'localhost',
      expires: date,
      secure: this.cookieHTTPS,
    };

    this.username = username;
    // this.cookie.put(JWT_KEY, jwt, opts);
    localStorage.setItem(JWT_KEY, jwt);
    localStorage.setItem('username', username);
  }

  /** Unsets the current user and clears authentication information. */
  public unsetUser() {
    this.username = null;
    // this.cookie.remove(JWT_KEY);
    localStorage.removeItem(JWT_KEY);
    localStorage.removeItem('username');
  }

  /** Returns the username of the currently logged in user, if any. */
  public getUsername(): string {
    if (!this.username) {
      this.username = localStorage.getItem('username');
    }
    return this.username;
  }

  /** Returns the JWT of the currently logged in user, if any. */
  public getToken(): string {
    return localStorage.getItem(JWT_KEY);
    // return this.cookie.get(JWT_KEY);
  }

  public setSessionExpired(): void {
    localStorage.setItem('expired', 'true');
    this.unsetUser();
  }
  public isSessionExpired(): boolean {
    if (localStorage.getItem('expired'))
      return true;
    else
      return false;
  }
  public resetSessionExpired(): void {
    localStorage.removeItem('expired');
  }

  /** Returns whether there is currently a user logged in (best effort, token could be invalid). */
  public isLoggedIn(): boolean {
    let token = this.getToken();
    if (token) {
      if (jwt(token).exp < new Date().getTime()) {
        return true;
      }
      this.setSessionExpired();
    }
    return false;
  }

}


/**
CookieOptionsArgs
// https://github.com/salemdar/angular2-cookie#put

path - {string} - The cookie will be available only for this path and its sub-paths. By default, this is the URL that appears in your <base> tag.
domain - {string} - The cookie will be available only for this domain and its sub-domains. For security reasons the user agent will not accept the cookie if the current domain is not a sub-domain of this domain or equal to it.
expires - {string|Date} - String of the form "Wdy, DD Mon YYYY HH:MM:SS GMT" or a Date object indicating the exact date/time this cookie will expire.
secure - {boolean} - If true, then the cookie will only be available through a secured connection.
*/

interface CookieOptionsArgs {
  path: string;
  domain: string;
  expires: Date;
  secure: boolean;
}
