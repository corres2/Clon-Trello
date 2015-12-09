//Inicializamos las variables necesarias.
var express = require('express'),
	http = require('http'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	routes = require('./routes'),
	path = require('path');

	var persona={};
		connections={};
//Establece el puerto donde se ejecutara el servidor
app.set('port', process.env.PORT || 3000);
//Se hace uso de las vistas layout
app.set('views',__dirname + '/views');
app.set('view engine', 'jade');

var MongoClient = require('mongodb').MongoClient;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Connect to the db
var datab;
MongoClient.connect("mongodb://localhost:27017/tabl", function(err, db) {
  if(!err) {
  	datab=db;//se guarda una instancia de la conexion
    console.log("We are connected");
  }else{
  	console.log("not connected");
  }
});

//Indicamos el directorio de acceso publico
app.use(express.static(path.join(__dirname,'public')));
//Marco la ruta de acceso y la vista a mostrar
app.get('/', routes.index);
app.get('/tablero/:nametab', routes.tablero);
/** 
Configuracion del servidor socket.io
*/
var port = process.env.PORT || 3000;
// Ponemos a ejecutar el servidor
server.listen(port, function () {
    console.log('Servidor inicializado en %d', port);
});


io.sockets.on('connection', function (socket) {
	socket.username=Math.random().toString();
	connections[socket.username]=socket;
	console.log("CONECTADOS A SOCKET "+socket.username);
	
	//cuando se conecta el cliente manda un mensaje con su nombre o su id en la variable 'data'
	//se buscara en l base de datos los tableros que le pertenezcan
	socket.on('primero',function (data) {
		//guarda el nombre de usuario cuando se conecta
		console.log("aqui va la info "+data.data+" "+ socket.username);
		persona[socket.username]=data.data.toString();//guarda el numero de la sesion donde se encuentra
		console.log(socket.username);
		console.log(data.data+' '+persona[socket.username])
		var collection=datab.collection('tabl'); //establece la conexión con la colección llamada 'tabl' que es la que contiene a todos los tableros
		var stream = collection.find({creador:'123'}).stream();//busca en la colección, todas las entradas que tengan un creador con el nombre '123'
		stream.on("data", function(item) {//si encuentra entradas entonces las mandamos al servidor
			console.log(item);
			socket.emit('tableros',item);//manda los tableros al cliente que lo pide
		});
		stream.on("end", function() {});
		
	});

	socket.on("ConectaTablero",function(data){//recibe el nombre del tablero y saca las listas que pertenecen a este
		var collection=datab.collection('tabl'); //establece la conexión con la colección llamada 'tabl' que es la que contiene a todos los tableros
		var stream = collection.find({tablero:data.id}).stream();//busca en la colección, todas las entradas que tengan un creador con el nombre '123'
		stream.on("data", function(item) {//si encuentra entradas entonces las mandamos al servidor
			console.log(item);
			socket.emit('RecibeListas',item);//manda las listas al cliente que lo pide
		});
		stream.on("end", function() {});
	})

	
	socket.on("tablero",function(info){
		datab.createCollection('tabl',{w:1}, function(err, collection) {//en esta parte se crea la coleccion 
		  	if(err){
		  		console.log("Error al crear el tablero "+err);
		  	}else{// si se creo correctamente entonces
		  		var collection=datab.collection('tabl');//se guarda la coleccion para modificarla
		  		collection.insert(info, {w:1}, function(err, result) {//se inserta en la coleccion
		  			if(result){//si se pudo insertar correctamante entonces 
		  				socket.emit("creado",result);//se comunica al cliente y se le manda toda la info de la creacion
		  				console.log(result.id+" se creo tablero "+info.creador+info.nombre);//mensaje de prueba
		  			}else{
		  				console.log("no se creo nada!!")
		  			}
				//	collection.update({"usuarios"}, {$push:{usuarios:{doc2:1}}}, {w:1}, function(err, result) {});
		  		});		  		
		  	}
		  });
	});

	//se inserta una lista dentro del tablero nombrado, el nombre viene en 'tab.tablero'
	socket.on("lista",function(tab,info){
		//con el push se mete en la parte de las listas del tablero nombrado
		datab.createCollection('tabl',{w:1}, function(err, collection) {//en esta parte se crea la coleccion 
		  	if(err){
		  		console.log("Error al crear el tablero "+err);
		  	}else{// si se creo correctamente entonces
		  		var collection=datab.collection('tabl');//se guarda la coleccion para modificarla
		  		collection.insert(info, {w:1}, function(err, result) {//se inserta en la coleccion
		  			if(result){//si se pudo insertar correctamante entonces 
		  				for( key in persona){//busca a las personas que estén en el mismo tablero para mandarles la lista recien creada
		  					if(persona[key]==persona[socket.username]){
		  						connections[key].emit("creado",result);//se comunica al cliente y se le manda toda la info de la creacion
		  					}
						};	
		  				console.log(result.id+" se creo lista "+info.creador+info.nombre);//mensaje de prueba
		  			}else{
		  				console.log("no se creo nada!!")
		  			}
				//	collection.update({"usuarios"}, {$push:{usuarios:{doc2:1}}}, {w:1}, function(err, result) {});
		  		});	
		  	}
		  });
	});


	//crea las tarjetas
	socket.on("tarjeta",function(tab,list,info){
		var collection=datab.collection('tabl');
		console.log(tab.tablero+" "+list.lista);
		//con el push se mete en la parte de las listas del tablero nombrado
		collection.update({"nombre":tab.tablero,"listas.nombre":list.lista},{
			$push:{
				"listas.$.tarjetas":info
			}},
			{w:1}, 
			function(err, result) {
				if(!err){
					console.log("se modifico la parte de las tarjetas");
				}else{
					console.log(err);
				}
			}
		);
		});
	
	
//esta funcion es para crear un nuevo usuario
	socket.on("usuario",function(nom,email,pwd){		
		datab.createCollection('user',{w:1}, function(err, collection) {//en esta parte se crea la coleccion 
		  	if(err){
		  		console.log("Error al crear el usuario "+err);
		  	}else{// si se creo correctamente entonces
		  		var collection=datab.collection('user');//se guarda la coleccion para modificarla
		  		collection.insert(info, {w:1}, function(err, result) {//se inserta en la coleccion
		  			if(result){//si se pudo insertar correctamante entonces 
		  				socket.emit("creado",result);//se comunica al cliente y se le manda toda la info de la creacion
		  				//se debe crear la tabla en la base de datos
						//console.log(result.id+" se creo el usuario "+info.creador+info.nombre);//mensaje de prueba
		  			}else{
		  				console.log("no se creo nada!!")
		  			}				
		  		});	
		  	}
		  });
	});


	socket.on('disconnect', function(){
		//delete connections[socket.username]
		//delete persona[socket.username]

	});
});
