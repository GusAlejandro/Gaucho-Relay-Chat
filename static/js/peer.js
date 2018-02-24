function connect_to() {
    var servers = {"GRC":"ws:/169.231.179.243:8765"};
    var server_address = servers[$('#address').val()];

    var ws = new WebSocket(server_address);

    ws.onopen = function () {
        document.getElementById("serverField").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
        alert("we are now connected");
    };

    ws.onmessage = function (event) {
        // need to start handling different kinds of events before appending
        // below is a list of event types
        // private message request acceptance -> if accepted, should open up new window
            // look for message[0] being pm-request, followed by peer_id, followed by the actual message
        // private message request response -> should open up new window
            // look for message[0] being pm-acceptance, followed by peer_id, followed by the actual message
        var message = event.data;
        message = message.split(" ");
        if (message[0] == "pm-request") {
            var peer_id = message[1];
            message.splice(0,1);
            message.splice(0,1);
            var user = message[0];
            message = message.join(" ");
            //$("#messages").append('<li>'+message+'</li>');
            if (confirm(message)){
                window.open("http://169.231.179.243:5000/direct_message/"+peer_id);
                ws.send("/accept " + user);
            }else{
                //nothing for now
            }
        } else if (message[0] == "pm-acceptance") {
            var peer = message[1];
            message.splice(0,1);
            message.splice(0,1);
            message = message.join(" ");
            //$("#messages").append('<li>'+message+'</li>');
            alert(message);
            window.open("http://169.231.179.243:5000/direct_message/"+peer);
        }else {

            message = event.data;
            $("#messages").append('<li>'+message+'</li>');
            console.log("we got a message");
        }



    };

    $('#sendButton').on('click', function () {
        var message = $('#myMessage').val();
        ws.send(message);
        $('#myMessage').val('');
    });




}


$(document).ready( function () {
    var x = document.getElementById("chat");
    x.style.display = 'none';



});

