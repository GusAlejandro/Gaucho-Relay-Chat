


function padding(msg) {
    msg_length = 16-(msg.length%16);
    message = message + "^".repeat(msg_length);
    return message
}

function unpad(msg) {
}
var key = CryptoJS.enc.Hex.parse("This is a key123");
function encrypt_message(msg) {
    var nonce = CryptoJS.enc.Hex.parse('3iNVHJXuCfYoU9QP49DGqw==');
    var encryptedAES = CryptoJS.AES.encrypt(msg, key,{iv: nonce, padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.CTR}).toString();
    console.log(encryptedAES);
    //encryptedAES = CryptoJS.enc.Base64.parse(encryptedAES);
    //encryptedAES = encryptedAES.toString(CryptoJS.enc.hex);
    return encryptedAES
}


function decrypt_message(msg) {
    var the_iv = "laksldkskdkekdkr";
    //msg = CryptoJS.enc.Hex.parse(msg);
    msg = msg.toString(CryptoJS.enc.Base64);
    decryptedAES = CryptoJS.AES.decrypt(msg, key,{iv: CryptoJS.enc.Base64.parse(the_iv), padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.CBC});
    decryptedAES = decryptedAES.toString(CryptoJS.enc.Utf8);
    return decryptedAES
}


// var message = "12345678901234563sasfadsdf";
// var x = encrypt_message(message);
// console.log(x.toString());
// //
// // var y = decrypt_message(x);
// // console.log(y);
//
localStorage.setItem("public", "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv44ExFWGOVGROyYmesFceHZjX\n" +
    "XF+unFuYyCJWR99Sg2rqgKnYbvxTS023aWhKRSQY2y0jrQ53XV9TiVWE2CNhXGdf\n" +
    "gLnmK21DTJl7b+joMIHypLO2CjULDSiaMiSIDxQ1J8pJD4ZiHlN07TLjUv+lNHqW\n" +
    "l9SsBcIEzPB5+No6JwIDAQAB\n" +
    "-----END PUBLIC KEY-----");


localStorage.setItem("private","-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXAIBAAKBgQCv44ExFWGOVGROyYmesFceHZjXXF+unFuYyCJWR99Sg2rqgKnY\n" +
    "bvxTS023aWhKRSQY2y0jrQ53XV9TiVWE2CNhXGdfgLnmK21DTJl7b+joMIHypLO2\n" +
    "CjULDSiaMiSIDxQ1J8pJD4ZiHlN07TLjUv+lNHqWl9SsBcIEzPB5+No6JwIDAQAB\n" +
    "AoGAXF2syonf4U6QHo/XpW4VUctZKD9qP9f8gg8XeRflPv+kdeF7UB14hIVXGqpQ\n" +
    "CjCk9CilW8bVgfmWxdepAUo/yVIB0A9HjaNYgPwqymw8GE4hQzosRXhavDPHFx/x\n" +
    "bL8AjoOEsEfMnZyJkjP/ZEptQfJQUGLqB6RStHa3OnAAaYECQQDJdPb1NUUBzaFG\n" +
    "6O4baroNrNttYPXsO53cY5sY8sLxnh3WbGZj9KgcFU4nRsdK+/7UmtKq3wrqL+fT\n" +
    "Gfq+jhbbAkEA34Jmg3zMKixGlZwIVrSnsVcp0Pl+B5kcJxrYAmYpM/me2E4ls5D4\n" +
    "5jiRMKqXBOiKpbf+k2IXig7k2Z304RMtpQJAfkcK5flWICM9DK3FUvo7VYccpBs7\n" +
    "C7Dy6sqk1aaV+84Y9edM5yrclX3lV0lOcvoyaiICG4lj1hfhQLnwKrH2MQJAWzqg\n" +
    "mT7RHs2fqeVcSffHEs2fFdsgI/3MzfFZBfGpE7vpqCSNovOjhGTGbnTS24AHR4kI\n" +
    "ciPxs7pMkr60e0IWuQJBALEGTBHJAR4r4mBJFdeIu6yt/avbpsnqVKEuCKBMpba6\n" +
    "N7OKqf54WL0xlsxDg9RIAlvhmJyOd3EC1UdEQYTvSL0=\n" +
    "-----END RSA PRIVATE KEY-----");



var publicKey = forge.pki.publicKeyFromPem(localStorage.getItem("public"));
var privateKey = forge.pki.privateKeyFromPem(localStorage.getItem("private"));


// var secretMessage = "WORDS FROM A MAD MAN";
//
// var encr = publicKey.encrypt(secretMessage, "RSA-OAEP", {
//    md: forge.md.sha256.create(),
//    mgf1: forge.mgf1.create()
// });
// var base64 = forge.util.encode64(encr);
// console.log(base64);
//



var other = "dM0ztQJ7ueyGPpWHrThy9My1twJ9fiS6cTuqyJGyKj1cn5IU8euiljaDncxNTSNLED5YPN5ZQ0noVMXyXUA9cSxBGJIB/tCofSA9r37GxEhWhsLmgvLxXvPdt/LvlGxUPKvYrAsm69FIKna9FAmUenFG6Cf1ijEHxdKFuKemCAk=";
var red = forge.util.decode64(other);
var decr = privateKey.decrypt(red, "RSA-OAEP", {
    md: forge.md.sha256.create(),
   mgf1: forge.mgf1.create()
});
console.log(decr);
console.log(forge.util.decode64(decr));



