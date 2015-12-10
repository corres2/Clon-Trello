//Redireccionar al index
exports.index = function(req, res) {
  res.render('index',{title: 'Trello'})
};

//Redireccionar a tableros
exports.tablero = function(req, res){
  res.render('tablero',{title: 'Tablero Prueba', nombre: req.params.nametab})
};

//Redireccionar a registro
exports.login = function(req, res){
  res.render('login',{title: 'Registro de Usuarios', nombre: req.params.nametab})
};