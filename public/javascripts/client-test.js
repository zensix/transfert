function sendFunction() {
    socket.emit('new message', $('#new-message').val());
    $('#new-message').val('');
  }


$(document).ready(function () {
    socket.on('message', function(message){
        $('#serveur_message').empty().append(message)
    });

    $('#btn_testsocket').on('click', function () {
        socket.emit('client_message', "message de test");
    });

});