    //connection cote client cc
var socket = io.connect('localhost:4545/')

var nom = document.getElementById('nom'),
    message = document.getElementById('message'),
    formLog = document.getElementById('form-log'),
    log = document.getElementById('log'),
    userConnected = document.getElementById('user-connected'),
    chatForm = document.getElementById('chatForm'),
    box = document.getElementById('box'),
    feedback = document.getElementById('feedback');

        //login window
    formLog.addEventListener('submit', (e) => {

        if(nom.value == "" || nom.value.length < 3)
            {
                e.preventDefault();
                alert('entrer un pseudo: min 3 lettre');
            }

        else
            {
                e.preventDefault();
                $('#log').fadeOut();
                userConnected.innerHTML = ' - @'+ nom.value;
                message.value = "";
                message.focus();
            }
    });


        //chat form
    chatForm.addEventListener('submit', (e) => {

    e.preventDefault();
    if(nom.value == "" || message.value == "")
        {
            e.preventDefault();
            alert('remplisser les champs!');
        }

    else
        {
            box.innerHTML += '<div class="container">'+ //send
                               ' <div class="row m-0 justify-content-end">'+
                                    '<div class="message-card">'+
                                        '<div class="card-body bg-primary">'+
                                            '<span>' +message.value+ '</span>'+
                                        
                                    '</div>'+
                                    '<span class="receiver-time"><i> moi </i></span>'+
                                '</div>'+
                                '<i class="fa fa-user-circle"></i>'+
                            '</div>'+
                        '</div>';
                        
            
        }

    //rec + envoi des donnee au server rr
     var data = {

        'nom': nom.value,
        'message' : message.value
    }
    socket.emit('chat', data)


    message.value = "";
    message.focus();

}); //end event submit

    //**keypress event
message.addEventListener('keypress', () => {

    socket.emit('typing', nom.value); //envoi d l'event tt
});


    // listen ee
socket.on('chat', (data) => {

    console.log(data)
    var me = nom.value;

    if(me != data.nom)
        {
            if(data.nom == "" || data.message == "")
                {
                    preventDefault();
                }
            else
                {              
                    box.innerHTML += '<div class="container">'+ //receive
                                    ' <div class="row m-0 justify-content-start">'+
                                            '<div class="message-card">'+
                                                '<div class="card-body bg-success">'+
                                                    '<span>'+data.message+'</span>'+
                                                
                                            '</div>'+
                                            '<span class="receiver-time"><i>'+data.nom+'</i></span>'+
                                        '</div>'+
                                        '<i class="fa fa-user-circle"></i>'+
                                    '</div>'+
                        '</div>';
            
                        feedback.innerHTML = "";
                }
        }
});

    //listen keypress event
socket.on('typing', (data) => {

    feedback.innerHTML = '<i><strong>'+data+'</strong>'+' est entrain d\'ecrire</i>';
});
