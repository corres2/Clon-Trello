var _ = require('underscore');
var heroes = [
  { 
    name: 'Chuck Norris', 
    facts: [
      'No existe la teoría de la evolución, tan sólo una lista de las' +
      ' especies que Chuck Norris permite vivir. ', 
      'Chuck Norris no te pisa un pie, sino el cuello.',
      'Chuck Norris borró la papelera de reciclaje.'] 
  },
  {
    name: 'Bruce Scheneier',
    facts: [
      'Science is defined as mankinds futile attempt at learning ' +
      'Bruce Schneiers private key.', 
      'Others test numbers to see whether they are prime. Bruce ' +
      'decides whether a number is prime.']
  },
  {
    name: 'Arturo Pérez-Reverte',
    facts: [
      'Pérez-Reverte se baja música en casa de Ramoncín.', 
      'Pérez-Reverte no necesita investigar para escribir novela ' +
      'histórica, el pasado cambia conforme teclea en la máquina.']
  }
];
 
 
exports.index = function(req, res) {
  //var names = heroes.map(function(p) { return p.name; });
  //res.render('index', { heroes: names })
  res.render('index',{title: 'Express'})
};

exports.about = function(req, res){
	res.render('index',{title: 'About'})
};