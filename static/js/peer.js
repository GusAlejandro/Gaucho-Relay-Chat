function connect_to() {
    var servers = {"GRC":"ws:/169.231.178.10:8765"};
    var server_address = servers[$('#address').val()];

    var ws = new WebSocket(server_address);

    ws.onopen = function () {
        document.getElementById("serverField").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
        alert("we are now connected");
    };

    ws.onmessage = function (event) {

        var message = event.data;
        message = message.split(" ");
        if (message[0] == "pm-request") {
            var peer_id = message[1];
            message.splice(0,1);
            message.splice(0,1);
            var user = message[0];
            message = message.join(" ");
            if (confirm(message)){
                window.open("http://169.231.178.10:5000/direct_message/"+peer_id);
                ws.send("/accept " + user + " " + peer_id);
            }else{
                //nothing for now
            }
        } else if (message[0] == "pm-acceptance") {
            var id_to_connect_to = message[1];
            message.splice(0,1);
            message.splice(0,1);
            message = message.join(" ");
            alert(message);
            window.open("http://169.231.178.10:5000/direct_message_origin/"+id_to_connect_to);
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

