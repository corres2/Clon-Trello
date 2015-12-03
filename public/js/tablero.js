$(document).ready(function(){
	var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN TABLERO.JS");
    var socket = io.connect(URL);

    socket.on('connect', function(){
      var numerito=Math.floor(Math.random()*2-1+1);
      socket.emit('primero',{'data':numerito});
      var t=$("#nn").text()
      $("#nn").text(t+" "+numerito);
    })

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
        //alert("Se creo lista llamada:"+list);
	}); 

    $('#addlist').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
            
        }

    });


    socket.on('creado', function(data){//da el id y los demas datos que se ingresaron en mongo
       // console.log(data.ops[0]._id+" "+data.ops[0].creador+" "+data.ops[0].nombre);//recibe informacion de el resultado
        $("#listnew").after('<div class="list-group col-md-3 bg-primary"><p>'+data.ops[0]._id+'</p>'+'<h3>'+data.ops[0].nombre+'</h3></div>');
        console.log(data.ops[0].creador+" ha creado la lista '"+data.ops[0].nombre+"'");
    });

})



