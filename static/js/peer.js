var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function encrypt(plaintext, key) {
    key = Number(key);
    plaintext = plaintext.toLowerCase();
    var ciphertext = "";
    for (i=0;i<plaintext.length;i++){
        if (alphabet.indexOf(plaintext.charAt(i)) > -1 ){
            var x = alphabet.indexOf(plaintext[i]);
            x = (x + key)%alphabet.length;
            ciphertext = ciphertext + alphabet[x];
        }else {
            ciphertext = ciphertext + plaintext[i];
        }
    }
    return ciphertext
}

function decrypt(ciphertext, key) {
    key = Number(key);
    ciphertext = ciphertext.toLowerCase();
    var plaintext = "";
    for(i=0;i<ciphertext.length;i++){
        if(alphabet.indexOf(ciphertext.charAt(i))>-1){
            var x = alphabet.indexOf(ciphertext[i]);
            x = x - key;
            if(x<0){
                x = x + alphabet.length;
                plaintext = plaintext + alphabet[x];
            }else{
                plaintext = plaintext + alphabet[x];
            }
        }else{
            plaintext = plaintext + ciphertext[i];
        }
    }
    return plaintext
}


function hash(message) {
    var md = forge.md.sha256.create();
    md.update(message);
    return md.digest().toHex();
}

function is_message_authentic(theHash, message){
    var calculated_hash = hash(message);
    console.log("CALCULAA" + calculated_hash);
    return calculated_hash === theHash
}


function RSA_encrypt(server_key, message) {
    // takes in server's public key to encrypt a message
    var ciphertext = server_key.encrypt(message, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: forge.mgf1.create()
    });
    ciphertext = forge.util.encode64(ciphertext);
    return ciphertext
}

function RSA_decrypt(private_key, ciphertext) {
    // takes in own private key to decrypt messagge
    ciphertext = forge.util.decode64(ciphertext);
    var plaintext = private_key.decrypt(ciphertext, "RSA-OAEP", {
          md: forge.md.sha256.create(),
          mgf1: forge.mgf1.create()
    });
    plaintext = forge.util.decode64(plaintext);
    return plaintext
}

function message_inbound(encrypted_message, symm_key) {
    console.log("WIIWI: " + encrypted_message);
    var hash_and_message = decrypt(encrypted_message, symm_key);
    console.log(hash_and_message);
    var the_hash = hash_and_message.slice(0,64);
    var message = hash_and_message.slice(64);
    console.log("the has: "+ the_hash);
    console.log("the mess: " + message);
    var result = is_message_authentic(the_hash, message);
    if (result === true){
        return message
    }else{
        console.log("ACTUALLY WAS: " + message);
        return "Message has been corrupted"
    }
}

function message_outbound(raw_message, symm_key) {
    raw_message = raw_message.toLowerCase();
    var message_hash = hash(raw_message);
    var message_and_hash = message_hash + raw_message;
    return encrypt(message_and_hash, symm_key);
}


function connect_to() {
    var servers = {"GRC":"ws:/169.231.178.10:8765"};
    var server_address = servers[$('#address').val()];


    var ws = new WebSocket(server_address);

    var publicKey = forge.pki.publicKeyFromPem(localStorage.getItem("public"));
    var privateKey = forge.pki.privateKeyFromPem(localStorage.getItem("private"));
    var server_public = forge.pki.publicKeyFromPem(localStorage.getItem("server-public"));
    var symm_key = "5";

    ws.onopen = function () {
        document.getElementById("serverField").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
        alert("we are now connected");
    };

    ws.onmessage = function (event) {

        var message = event.data;
        //process inbound
        message = message_inbound(message, symm_key);
        var sav = message;
        message = message.split(" ");
        if (message[0] == "pm-request") {
            var peer_id = message[1];
            message.splice(0,1);
            message.splice(0,1);
            var user = message[0];
            message = message.join(" ");
            if (confirm(message)){
                window.open("http://169.231.178.10:5000/direct_message/"+peer_id);
                var x = "/accept " + user + " " + peer_id;
                x = message_outbound(x, symm_key);
                ws.send(x);
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
        } else {
            message = sav;
            $("#messages").append('<li>'+message+'</li>');
            console.log("we got a message");
        }



    };

    $('#sendButton').on('click', function () {
        var message = $('#myMessage').val();
        // process the outbound
        message = message_outbound(message, symm_key);
        ws.send(message);
        $('#myMessage').val('');
    });




}


$(document).ready( function () {
    var x = document.getElementById("chat");
    x.style.display = 'none';

    localStorage.setItem("public", "-----BEGIN PUBLIC KEY-----\n" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNY1LV06k9MNkFDb81Ad8ICYZM\n" +
        "ckfor6oWDyFRPBN4cOzxy1R/02RTXg8FvEUewGb0ZLgRE+L8pnGlkK8A4RVmNiiZ\n" +
        "J9W6DDQBjc4Pc8b1EqOKAVqjWncGgGjtooIK3ezaPh2tWJY9e7Lp2AZbb0nT0KQf\n" +
        "JLU1ZaRuCoS2aOhFmQIDAQAB\n" +
        "-----END PUBLIC KEY-----");

    localStorage.setItem("private", "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIICXQIBAAKBgQDNY1LV06k9MNkFDb81Ad8ICYZMckfor6oWDyFRPBN4cOzxy1R/\n" +
        "02RTXg8FvEUewGb0ZLgRE+L8pnGlkK8A4RVmNiiZJ9W6DDQBjc4Pc8b1EqOKAVqj\n" +
        "WncGgGjtooIK3ezaPh2tWJY9e7Lp2AZbb0nT0KQfJLU1ZaRuCoS2aOhFmQIDAQAB\n" +
        "AoGAN5yKJE2QSHo+eMjVGfQswI9bpr1WzSErS5fDLKy4lOb2sS2d7pJ9WrlgFex5\n" +
        "Rq9P8SKIWE9rKX+jy/GWAQXw9eSnb4ugQFPnB8RmhUoyaFKO0GJJ9T61vV5SjoAv\n" +
        "ES2EuYZbiosSj0SyMYd8/fKfq2tkG9J8i+p7YdmQkX/uSXUCQQDaXJDKp+D8IdsY\n" +
        "RRM0TvdnnDyCL37xasnB3ELaQwfp/REgvaxJPvw7IhR4QGZ6/5JuNY/RW/+B4FoZ\n" +
        "Y3L8POm/AkEA8MpIv76a5XbH0H2bcxO38eAmV2sWb43uaDFkf+N4NC4BxE3iwVWx\n" +
        "IHW8sd4WFVFsv/7D29Gb7br7/pktJIK2pwJBAKk576R+8me0PT3T2oxBXo9Xj7U8\n" +
        "5d5m6jFpaA4KwMlgLLP5CtpBC+0v/jkrf8B27J6ot+qCp8OZgXoHjodZFbUCQQCO\n" +
        "lMmlOOGR1NcW/vnIl7mJcVhi1VeQsPOmIPFIxVJNW5zSN+h44Rwkg3M7w61B7FhA\n" +
        "DES/6ouxptJG/T786qXrAkAxwh5Zvd3TbyjnQSM9OqkrruNAMu/igK9f5xni9fJk\n" +
        "EhOkyB9xcuvbNDFPBtvIDoAhq9V+F+Yo9mOZjOj7YDza\n" +
        "-----END RSA PRIVATE KEY-----");

    localStorage.setItem("server-public", "-----BEGIN PUBLIC KEY-----\n" +
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv44ExFWGOVGROyYmesFceHZjX\n" +
        "XF+unFuYyCJWR99Sg2rqgKnYbvxTS023aWhKRSQY2y0jrQ53XV9TiVWE2CNhXGdf\n" +
        "gLnmK21DTJl7b+joMIHypLO2CjULDSiaMiSIDxQ1J8pJD4ZiHlN07TLjUv+lNHqW\n" +
        "l9SsBcIEzPB5+No6JwIDAQAB\n" +
        "-----END PUBLIC KEY-----");


});

