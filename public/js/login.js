/*$(document).ready(function(){

  var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN login.JS");
    var socket = io.connect(URL);
    var t;
    socket.on('connect', function(){
      socket.emit('conectaRegistro',{'id':"conecta"});//manda el nombre del tablero accedido para pedir sus listas
    

    });

     $('#cancelar').click(function(){ 
      $('#nombre').val('');
      $('#correo').val('');
      $('#pass').val('');
    });    



  $('#guardar').click(function(){ 
      nombre=$('#nombre').val();
      correo=$('#correo').val();
      pass=$('#pass').val();
      //console.log(list);
      var md5 = $.md5(pass);

      // CryptoJS.MD5(pass);
        console.log(pass+" "+md5);
        socket.emit('usuario',{'tipo':'usuario',"nombre":nombre,"correo":correo,"pass":md5});
        $('#nombre').val('');
         $('#correo').val('');
          $('#pass').val('');

        alert("Se creo usuario llamado: "+nombre);
  }); 

    $('#nombre').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
        }
    });
    $('#correo').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
        }
    });
    $('#pass').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
        }
    });

    
});



*/ 