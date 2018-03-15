
function setup_keys() {
    // save own public and private key
    // get request on /chat
    console.log("fdasafafsd");
    var public_key = $('#public-key').val();
    var private_key = $('#private-key').val();

    localStorage.setItem("public", public_key);
    localStorage.setItem("private", private_key);
    window.location.href = "http://169.231.178.10:5000/chat";
}



$(document).ready( function () {
    $('#save-keys').on('click', function () {
        setup_keys();
    });
});



