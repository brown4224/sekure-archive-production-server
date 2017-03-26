import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class Socket {
  private url = 'http://127.0.0.1:3000';
  private socket;

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  authenticate(username : string, password :string){
    var socket = io.connect(this.url);
  socket.on('connect', function(){
    // socket.emit('authenticate', {token: myAuthToken});
    socket.emit('authenticate', {username: username, password: password});
    // socket.on('authenticated', function() {
    //   // Do stuff
    // });
  });
}


  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url, {  path: '/socket.io'});
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
