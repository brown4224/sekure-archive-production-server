import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import * as io from 'socket.io-client'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
//   socket = null;
//   constructor(public router: Router, private _cookieService: CookieService) {
// this.socket =  io('http://localhost:3000');
// this.socket.on('message', (msg)=> {
//   console.log(msg);
// })
// this.socket.emit('message', msg);
//   }
}
