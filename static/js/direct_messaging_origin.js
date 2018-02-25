var url = window.location.href;
url = url.split('/');
var peer_id = url.pop();
// should use the peerjs given ID and connect to
// should use the peer_id given as the target contact

var peer = new Peer({key: 'mbfckg8hh5q257b9',config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' }
  ]}});

peer.on('open', function (id) {
   console.log("this is id: " + id);
});

peer.on('connection', connect);

function connect(c) {

    console.log("WE ARE IN");

    c.on('data', function (data) {
        console.log(data);
        $("#messages").append('<li>'+data+'</li>');
    })



};


$(document).ready(function () {



    $('#theSample').on('click', function () {
        //var id_to_cconect_to = $("#peer_id_to_connect_to").text();
        //var val =  $('#theid').val();
        //console.log(id_to_cconect_to);
        var c = peer.connect(peer_id);
        c.on('open', function () {
           connect(c);
        });

        $('#sendButton').on('click', function () {
            var msg =  $('#myMessage').val();
            $("#messages").append('<li>'+msg+'</li>');
            c.send(msg);
            $('#myMessage').val('');
        });

    });
    //
    // $('#sendButton').on('click', function () {
    //    var msg =  $('#myMessage').val();
    //    c.send(msg);
    // });




   //var peer = new Peer({key: 'mbfckg8hh5q257b9'});
   //  var id_to_cconect_to = $("#peer_id_to_connect_to").text();
   //
   //  peer.on('open', function (id) {
   //      console.log('my peer ID is: ' + id);
   //      //console.log($("#peer_id_to_connect_to").text());
   //      //var id_to_cconect_to = $("#peer_id_to_connect_to").text();
   //      // var conn = peer.connect(id_to_cconect_to);
   //      // console.log(conn);
   //
   //      var conn = peer.connect(id_to_cconect_to);
   //      conn.on('open', function () {
   //          console.log("BITCH");
   //      });
   //
   //  });
   //
   //
   //
   //
   //  peer.on('close', function () {
   //     console.log("its closed");
   //  });

    //var id_to_cconect_to = $("#peer_id_to_connect_to").text();
    //var conn = peer.connect(id_to_cconect_to);

    // conn.on('open', function () {
    //     //receive messages
    //     console.log("PLACE PUT");
    //     conn.on('data', function (data) {
    //         // append data to UI list
    //         $("#messages").append('<li>'+data+'</li>');
    //     });


        // // put in listener for the send button to grab the text and send with: conn.send(stuff);
        //
        // $('#sendButton').on('click', function () {
        //     var message = $('#myMessage').val();
        //     conn.send(message);
        //     $('#myMessage').val('');
        // });

    //});

});
