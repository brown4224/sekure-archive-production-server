module.exports.listen = function(io){

  //Socket Name Spaces
  // var _ = require('underscore');
  // _.each(io.nsps, function(nsp){
  //   nsp.on('connect', function(socket){
  //     if (!socket.auth) {
  //       console.log("removing socket from", nsp.name)
  //       delete nsp.connected[socket.id];
  //     }
  //   });
  // });

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.auth = false;

    socket.on('authenticate', function(data){
      //check the auth data sent by the client
      console.log('authentication');
      console.log(data);
      var user = data.username;
      var pass = data.password;
      console.log(user);
      console.log(pass);

      // app.authenticate(2, 'password').then(console.log('Succesful Auth'), () => console.log('Error'));


      // checkAuthToken(data.token, function(err, success){
      //   if (!err && success){
      //     console.log("Authenticated socket ", socket.id);
      //     socket.auth = true;
      //   }
      // });
    });

    setTimeout(function(){
      //If the socket didn't authenticate, disconnect it
      if (!socket.auth) {
        console.log("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, 1000);




    // END AUTH

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });


    // socket.on('add-message', (message) => {
    //   console.log("Server Recieves Message")
    //   console.log(message);
    //   io.emit('message', {type:'new-message', text: message});
    // });
  });

  return io
}

//Auth provided by: https://facundoolano.wordpress.com/2014/10/11/better-authentication-for-socket-io-no-query-strings/
