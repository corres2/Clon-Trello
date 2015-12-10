//Redireccionar al index
exports.index = function(req, res) {
  res.render('login',{title: 'Trello'})
};

//Redireccionar a tableros
exports.tablero = function(req, res){
  res.render('index',{title: 'Tablero Prueba'})
};

//Redireccionar a listas
exports.listas = function(req, res){
  res.render('tablero',{title: 'Tablero Prueba', nombre: req.params.nametab})
};

//Redireccionar a registro
exports.signin = function(req, res){
  res.render('signin',{title: 'Registro de Usuarios'})
};