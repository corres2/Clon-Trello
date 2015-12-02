$(document).ready(function(){
	var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN TABLERO.JS");
    var socket = io.connect(URL);

    socket.on('creado', function(data){//da el id y los demas datos que se ingresaron en mongo
      console.log(data.ops[0]._id+" "+data.ops[0].creador+" "+data.ops[0].nombre);//recibe informacion de el resultado
    });

    $('#addlist').click(function(){
        $('#guardar').show();
        $('#cancelar').show();
        $("#listnew").addClass("bg-primary");
        //alert("Se creo lista llamada:");
	})
     $('#cancelar').click(function(){
    	$('#guardar').hide();
    	$('#cancelar').hide();
        $("#listnew").removeClass("bg-primary");
        $('#addlist').val('');
    });    

	$('#guardar').click(function(){	
	    list=$('#addlist').val();
	    //console.log(list);
	    socket.emit('lista',{"tablero":"TABLERO"},{'creador':"LUISA","nombre":list});
        $('#addlist').val('');
        $('#guardar').hide();
        $('#cancelar').hide();
        $("#listnew").removeClass("bg-primary");
        $("#listnew").after('<div class="list-group col-md-3 bg-primary"><h3>'+list+'</h3></div>');
        //alert("Se creo lista llamada:"+list);
	}); 
})



