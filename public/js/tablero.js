$(document).ready(function(){
  var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN TABLERO.JS");
    var socket = io.connect(URL);
    var t;
    socket.on('connect', function(){
      var numerito=Math.floor(Math.random()*2-1+1);
      socket.emit('primero',{'data':numerito});
      t=$("#nn").text()
      /*$("#nn").text(t+" "+numerito);*/
      t=$("#nn").text()
      socket.emit('ConectaTablero',{'id':t});//manda el nombre del tablero accedido para pedir sus listas
    
      socket.on("RecibeListas",function(item){//recibe las listas del tablero accedido para mostrarlas
        //console.log("listas "+item._id);
        $("#listnew").after('<div class="list-group col-md-3"><div class="list-group-item active text-center tarjeta"><p>'+item._id+'</p>'+'<h3>'+item.nombre+'</h3><a class="btn btn-danger col-md-offset-1 addtarjeta">Añadir</a></div></div>');
      });

      socket.on("tableros",function(item){
        $("#listnew").after('<div class="list-group col-md-3"><a href="/tablero/'+item._id+'" class="list-group-item active text-center"><h4 class="list-group-item-heading">'+item.nombre+'</h4><p class="list-group-item-text">Ingresa al tablero</p></a></div>');
      });
    });

    


    $('#addlist').click(function(){
        $('#guardar').show();
        $('#cancelar').show();
        //alert("Se creo lista llamada:");
     });
    $('#cancelar').click(function(){
      $('#pdesc').show();
      $('#tablero').hide();
      $('#nametab').val('');
      //alert('Click cancelar');
    });    

  $('#guardar').click(function(){ 
      nametab=$('#nametab').val();
      //console.log(list);
      socket.emit('tablero',{'creador':"LUISA","nombre":nametab});
      $('#nametab').val('');
      $('#pdesc').show();
      $('#tablero').hide();
      //alert("Se creo lista llamada:"+list);
  }); 

    $('#addlist').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
        }
    });

    socket.on('creado', function(data){//da el id y los demas datos que se ingresaron en mongo
       // console.log(data.ops[0]._id+" "+data.ops[0].creador+" "+data.ops[0].nombre);//recibe informacion de el resultado
        $("#listnew").after('<div class="list-group col-md-3"><a href="/tablero/'+data.ops[0].nombre+'" class="list-group-item active text-center"><h4 class="list-group-item-heading">'+data.ops[0].nombre+'</h4><p class="list-group-item-text">Ingresa al tablero</p></a></div>');
        console.log(data.ops[0].creador+" ha creado el tablero '"+data.ops[0].nombre+"'");
    });

    //Mostrar input para añadir lista
    $('div.tarjeta > a.addtarjeta').click(function(){
      alert("Hola");
    });

    $('#pdesc').click(function(){
      //alert('Click Addtab');
      $('#pdesc').hide();
      $('#tablero').show();
    });
});



