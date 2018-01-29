function connect_to() {
    // eventually set the registered username as part of tuple that goes with everywhere (username, data) when sending to server
       console.log("adsf");

       var server_address = $('#address').val();
       var socket = io.connect(server_address);

       socket.on('connect', function() {
           document.getElementById("serverField").style.display = 'none';
           document.getElementById("chat").style.display = 'block';
           socket.emit('connected' ,'');
        });

       socket.on('message', function(msg) {
            $("#messages").append('<li>'+msg+'</li>');
            console.log('Received message');
        });


       socket.on('register', function (msg) {
           console.log('we are reggg ' + msg['username']);
           $("#messages").append('<li>'+msg['data']+'</li>');
           $('#username').text(msg['username']);
           console.log("the name is now " + $("#username").text());
       });

       $('#sendbutton').on('click', function() {
           // set up switch statement for all commands to do seperate emit statement
           var command = $('#myMessage').val().split(' ')[0];
           switch (command) {
               case '/register':
                   // code goes here
                   socket.emit('register', $('#myMessage').val().split(' ')[1]);
                   $('#myMessage').val('');
                   break;

               case '/join':
                   // code goes here
                   break;

               default:
                   var message = {'username' : $("#username").text(), 'data':$('#myMessage').val()};
                   socket.emit('message', message);
                   $('#myMessage').val('');
           }
        });


 }

$(document).ready(function() {
    var x = document.getElementById("chat");
    x.style.display = 'none';
    var y = document.getElementById("username");
    y.style.display = 'none';
    console.log("aaaa");

});