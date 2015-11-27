$(document).ready(function(){
	var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN TABLERO.JS");
    var socket = io.connect(URL);

    socket.on('creado', function(data){//da el id y los demas datos que se ingresaron en mongo
      console.log(data.ops[0]._id+" "+data.ops[0].creador+" "+data.ops[0].nombre);//recibe informacion de el resultado
    });

    $('#addlist').click(function(){
    	$(this).hide();
    	$('#newlist').show();
    	
   
	})
     $('#cancelar').click(function(){
    	$('#newlist').hide();
    	$('#addlist').show();
    });    

	$('#guardar').click(function(){	
	    list=$('#exampleInputName2').val();
	    console.log(list);
	    socket.emit('lista',{"tablero":"TABLERO"},{'creador':"LUISA","nombre":list});
	}); 
})



