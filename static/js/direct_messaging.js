var url = window.location.href;
url = url.split('/');
var peer_id = url.pop();


var peer = new Peer(peer_id, {key: 'mbfckg8hh5q257b9', config: {'iceServers': [
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
    });

    $('#sendButton').on('click', function () {
        var msg =  $('#myMessage').val();
        $("#messages").append('<li>'+msg+'</li>');
        c.send(msg);
        $('#myMessage').val('');
    });
};



$(document).ready(function () {





    // $('#sendButton').on('click', function () {
    //    var msg =  $('#myMessage').val();
    //    c.send(msg);
    // });


    // var peer_id = $('#peer-id').text();
    // var peer = new Peer(peer_id,{key: 'mbfckg8hh5q257b9'});
    //
    //
    // peer.on('open', function (id) {
    //     console.log("this is my id: " + id);
    // });
    //
    // peer.on('connection', function (conn) {
    //     // I dont think I need to do another conn.on('open')
    //     console.log("PLACE PUT");
    // });
    //
    //
    // peer.on('close', function () {
    //     console.log("iz close");
    // });
    //
    //
    // //});
    //





});
