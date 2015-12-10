$(document).ready(function(){
  var URL = window.location.protocol + "//" + window.location.host;
    console.log("CONECTADO A SOCKETS EN listas.JS");
    var socket = io.connect(URL);
    var t;
    socket.on('connect', function(){
      var numerito=Math.floor(Math.random()*2-1+1);
      socket.emit('primero',{'data':"lista"});
      t=$("#nn").text()
      //$("#nn").text(t+" "+numerito);
      t=$("#nn").text()
      socket.emit('ConectaTablero',{'id':t});//manda el nombre del tablero accedido para pedir sus listas
    
      socket.on("RecibeListas",function(item){//recibe las listas del tablero accedido para mostrarlas
        console.log("listas "+item._id);
        $("#listnew").after('<div class="list-group col-md-3 column" draggable="true"><div class="list-group-item active text-center tarjeta" id="'+item._id+'"><p>'+item._id+'</p>'+'<h3>'+item.nombre+'</h3><a href="#" class="addtarjeta" style="color:white;">Añadir nueva tarjeta</a><div id="target" style="display:none;"><input type="text" class="form-control" id="nametag" placeholder="Nombre de la nueva tarjeta"/><a class="btn btn-success col-md-offset-0" id="guardartar">Guardar</a><a class="btn btn-danger col-md-offset-0" id="cancelartar">Cancelar</a></div></div></div>');
                    /*h4.list-group-item-heading Agregar nueva lista
                        input(type="text" class="form-control" id="addlist" placeholder="Nombre de la nueva lista")
                        br
                        a(class="btn btn-success col-md-offset-0" id="guardar")
                          | Guardar
                        a(class="btn btn-danger col-md-offset-1" id="cancelar")
                          | Cancelar*/
      });
    });

    $('#addlist').click(function(){
        $('#guardar').show();
        $('#cancelar').show();
        //alert("Se creo lista llamada:");
     });
     $('#cancelar').click(function(){
      $('#guardar').hide();
      $('#cancelar').hide();
        $('#addlist').val('');
    });    

  $('#guardar').click(function(){ 
      list=$('#addlist').val();
      //console.log(list);
        t=$("#nn").text()
        socket.emit('lista',{'tipo':'lista','creador':"LUISA","nombre":list,"tablero":t});
        $('#addlist').val('');
        $('#guardar').hide();
        $('#cancelar').hide();
        alert("Se creo lista llamada:"+list);
  }); 

    $('#addlist').keyup(function(e){//llama al click de el boton 'guardar'
        if(e.keyCode == 13){
            $('#guardar').trigger('click');
        }
    });

    //Notificaciones
    socket.on('listacreada', function(data){//da el id y los demas datos que se ingresaron en mongo
       // console.log(data.ops[0]._id+" "+data.ops[0].creador+" "+data.ops[0].nombre);//recibe informacion de el resultado
        $("#listnew").after('<div class="list-group col-md-3"><div class="list-group-item active text-center tarjeta"><p>'+data.ops[0]._id+'</p>'+'<h3>'+data.ops[0].nombre+'</h3><a href="#" class="addtarjeta" style="color:white;">Añadir nueva tarjeta</a></div></div>');
        console.log(data.ops[0].creador+" ha creado la lista '"+data.ops[0].nombre+"'");
    });

    //Mostrar input para añadir lista
    $(document).on("click",".addtarjeta",function() {
      //alert($('.addtarjeta').parent());
      $('.addtarjeta').hide();
      $('#target').show();
    });
    $(document).on("click","#cancelartar",function() {
      $('#target').hide();
      $('.addtarjeta').show();
    });
    $(document).on("click","#guardartar",function() {
      name=$('#nametag').val();
      t=$("#nn").text()
      padre = $('.addtarjeta').parent();
      socket.emit('tarjeta',{"tablero":t},{'list':"rf","nombre":name});
      $('#name').val('');
      $('#target').hide();
      $('.addtarjeta').show();
    });
});



