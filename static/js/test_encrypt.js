

//
//
// var other = "dM0ztQJ7ueyGPpWHrThy9My1twJ9fiS6cTuqyJGyKj1cn5IU8euiljaDncxNTSNLED5YPN5ZQ0noVMXyXUA9cSxBGJIB/tCofSA9r37GxEhWhsLmgvLxXvPdt/LvlGxUPKvYrAsm69FIKna9FAmUenFG6Cf1ijEHxdKFuKemCAk=";
// var red = forge.util.decode64(other);
// var decr = privateKey.decrypt(red, "RSA-OAEP", {
//     md: forge.md.sha256.create(),
//    mgf1: forge.mgf1.create()
// });
// console.log(decr);
// console.log(forge.util.decode64(decr));
//
//
//


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

var publicKey = forge.pki.publicKeyFromPem(localStorage.getItem("public"));
var privateKey = forge.pki.privateKeyFromPem(localStorage.getItem("private"));
var server_public = forge.pki.publicKeyFromPem(localStorage.getItem("server-public"));
var symm = "23";
// x = RSA_decrypt(privateKey, "Vt+AMlavaOUM4ZNjM1m2WPpMawDfR3hHtN34b7hYZdKiGu9mWV33E/nti9bTiDIwjjusRMo4D1cpWWaRKAzkrxmIWyWPLLdqZL6nXK1jMibhiXOnR9NXDsDQBL/lOCQj/RO7cemZMxACowhOLfCCXBaiHxSBzK7KFUTw66mhLr4=");
// console.log(x);


// var md = forge.md.sha256.create();
// md.update("The quick brown fox jumped over the lazy dog");
// console.log(md.digest().toHex());
//


var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function encrypto(plaintext, key) {
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

function decrypto(ciphertext, key) {
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
    var hashval = md.digest().toHex();
    return hashval
}

function is_message_authentic(theHash, message){
    var calculated_hash = hash(message);
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
    var hash_and_message = decrypto(encrypted_message, symm_key);
    var the_hash = hash_and_message.slice(0,64);
    var message = hash_and_message.slice(64);
    var result = is_message_authentic(the_hash, message);
    if (result === true){
        return message
    }else{
        return "Message has been corrupted"
    }
}

function message_outbound(raw_message, symm_key) {
    var message_hash = hash(raw_message);
    var message_and_hash = message_hash + raw_message;
    return encrypto(message_and_hash, symm_key);
}


// x = message_outbound("HELLO WORLD", symm, server_public);
// console.log(x);



//
// var secretMessage = "WORDS FROM A MAD MAN";
//
// var encr = privateKey.encrypt(secretMessage, "RSA-OAEP", {
//    md: forge.md.sha256.create(),
//    mgf1: forge.mgf1.create()
// });
// var base64 = forge.util.encode64(encr);
// console.log(base64);
//

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
x = encrypt("the quick brown fox jumped over the lazy dog","5");
console.log(x);