//Redireccionar al index
exports.index = function(req, res) {
  res.render('index',{title: 'Trello'})
};

//Redireccionar a tableros
exports.tablero = function(req, res){
  res.render('tablero',{title: 'Tablero Prueba', nombre: req.params.nametab})
};

//Redireccionar a registro
exports.signin = function(req, res){
  res.render('signin',{title: 'Registro de Usuarios', nombre: req.params.nametab})
};