var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

var LibrosCtrl = require('../Controllers/LibrosCtrl');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/*
router.get('/libros', function(req, res, next) {
  res.render('index', { title: 'Libros', saludo:'gen 2017' });
});

router.post('/libros',function(req,res,next)){
	res.status(200).jsonp({nombre:'Código Da Vinci', autor:'Dan Brown'});
}); */

//Funcion que al entrar en el navegador con localhost:3000/libros manda a llamar a la funcion
//getLibros que se encuentra definida en el controlador LibrosCtrl
router.route('/libros')
		.get(LibrosCtrl.getLibros)
		.post(upload.array(),LibrosCtrl.addLibro);

//Funcion que al entrar al navegador con localhost:3000/libros/:(el id de algun libro) nos muestra
//solo la informacion del libro que esta especificado en la funcion getById
router.route('/libros/:id')
		.get(LibrosCtrl.getById)
		.put(upload.array(),LibrosCtrl.updateLibro) //mandar obj json con lo que quiero actualizar, se va a actualizar el id que se esta enviando en la ruta
		.delete(LibrosCtrl.deleteLibro); //borrar el id que se esta enviando en la ruta


router.route('/autores')
		.get(LibrosCtrl.getAutores); //devolver todos los autores

router.route('/autores/:nombre')
		.get(LibrosCtrl.getByAutor) //devuelve todos los libros de ese autor
		.put(upload.array(),LibrosCtrl.updateAutores) //actualizar nombre de autor en los libros
		.delete(LibrosCtrl.deleteAutor); //eliminar libros del autor

		//Utilizar git (comandos basicos), crear una cuenta en github y subir tarea1; no subir los node_modules
		//y hacer un README.md, enviar por classroom el link de github */
		module.exports = router; 


