// get the url to make the peer_id
var url = window.location.href;
console.log('url');
url = url.split('/');
var peer_id = url.pop();

//create PeerJS peer
var peer = new Peer({key: 'mbfckg8hh5q257b9',config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' }
  ]}});

peer.on('open', function (id) {
   console.log("this is id: " + id);
});

peer.on('connection', connect);

// logic to handle connection event
function connect(c) {
    // we can now show the file upload UI
    $('#file-upload').show();
    console.log("WE ARE IN");

    // called when messaged is received
    c.on('data', function (data) {
        console.log(data);
        if(data[0] == '/'){
            data = data.replace('/','');
            console.log("THIS HERE:" + data);
            // send the get req for file
            window.open('http://169.231.178.10:5000/get_file?file=' + data, '_blank');

        }else{
            $("#messages").append('<li style="color=#1d53e1;">'+data+'</li>');
        }

    })



};


$(document).ready(function () {


    // initiates peer to peer connection
    $('#theSample').on('click', function () {
        var c = peer.connect(peer_id);
        c.on('open', function () {
           connect(c);
        });

        //messsage send logic
        $('#sendButton').on('click', function () {
            var msg =  $('#myMessage').val();
            c.send(msg);
            msg = "You: " + msg;
            $("#messages").append('<li>'+msg+'</li>');
            $('#myMessage').val('');
        });


        //// send file upload code for peer retrieval
        $('#file-code').change(function () {
           //send the data thats on the h1 tag rn
            x = document.getElementById('file-code');
            c.send('/' + x.innerText);
        });

    });

    //file upload logic
    $('#sub').on('click', function () {
        console.log("fasdfa");
        var formData = new FormData($('#upload-file')[0]);
        $.ajax({
            type: 'POST',
            url: '/upload',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            async: false,
            success: function (data) {
                x = document.getElementById('file-code');
                x.innerText = data['file-code'];
                $('#file-code').change();
                var form = document.getElementById('upload-file');
                form.reset();
            }
        });

    });



});
