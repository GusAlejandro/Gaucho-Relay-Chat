$(document).ready(function () {
   var peer = new Peer({key: 'mbfckg8hh5q257b9'});

    peer.on('open', function (id) {
        console.log('my peer ID is: ' + id);
    });

});
