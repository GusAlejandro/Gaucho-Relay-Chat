function connect_to() {
    var server_address = $('#address').val();
    var ws = new WebSocket(server_address);

    ws.onopen = function () {
        document.getElementById("serverField").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
        alert("we are now connected");
    };

    ws.onmessage = function (event) {
        var message = event.data;
        $("#messages").append('<li>'+message+'</li>');
        console.log("we got a message");
    }

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

