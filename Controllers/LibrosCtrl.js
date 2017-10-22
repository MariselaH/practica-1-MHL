
//Arreglo de objetos json
var libros = [ 
{
id: '101',
titulo:'Codigo Da Vinci',
autor: 'Dan Brown',
anio: 2010,
genero: 'Novela'
},

{
id: '102',
titulo:'El caballero de la armadura oxidada',
autor: 'Robert Fisher',
anio: 1987,
genero: 'Ficcion'
},


{
id: '103',
titulo:'Angeles y Demonios',
autor: 'Dan Brown',
anio: 2000,
genero: 'Novela'
},

{
id: '104',
titulo:'Mujeres',
autor: 'Charles Bukowski',
anio: 1978,
genero: 'Relatos'
},

{
id: '105',
titulo:'El amor en los tiempos de colera',
autor: 'Gabriel Garcia Marquez',
anio: 1985,
genero: 'Relatos'
}

];

//FUNCION QUE REGRESA TODOS LOS LIBROS
exports.getLibros=function(req,res,next){
		console.log('GET /libros');
		res.status(200).jsonp(libros);
};

//FUNCION QUE REGRESA EL LIBRO DEL ID QUE SE ENVIO
exports.getById = function(req,res,next){
		console.log('GET /libros/:id');
	//	console.log(req.params.id);
		var tam= libros.length;
		var i;
		var parametro=req.params.id; //Toma el id que se envio en el URL
		var idp,arreglo=[];
		var ban=false,cont=0;
        //console.log("PARAMETRO ENVIADO="+parametro);
		for ( i = 0; i<tam; i++) {
		
		idp=libros[i].id //Toma el id del libro
		//idp=':'+idp
        //console.log("Id del libro="+idp);

			if(idp == parametro){
			//res.status(200).jsonp(libros[i]);
			
			arreglo[cont]=libros[i];
			console.log(libros[i]);
			ban=true;
			cont++;
			}
		}

		if(ban==true){
			res.status(200).jsonp(arreglo);
		}
		if(ban==false){
			//res.status(200).jsonp({valor:'No se encontro el libro'});
			res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
		} 
};

//FUNCION QUE INTRODUCE AL ARREGLO UN OBJETO NUEVO
exports.addLibro = function(req,res,next){
		//req.body trae la informacion del post
		console.log('POST/ libros');
		//libros[libros.length + 1]=req.body;
		libros.push(req.body); //req body es lo que esta enviando en post
		res.status(200).jsonp(libros);

};

//FUNCION QUE ACTUALIZA LA INFORMACION DEL LIBRO ESPECIFICADO EN EL ID
exports.updateLibro = function(req,res,next){
	console.log('PUT /libros/:id');
	console.log(req.params.id);
	console.log(req.body);

	var ban=false,indice;

	for(var i in libros){
		if(req.params.id == libros[i].id){
			libros[i]=req.body;
			ban=true;
			indice=i;
		}
	}

	if(ban==true){
		res.status(200).jsonp(libros[indice]);
	}
	if(ban==false){
		//res.status(200).jsonp({valor:'El id especificado no existe'});
		res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
	}
	//res.status(200).jsonp(libros[0]);
};

//FUNCION QUE ELIMINA UN LIBRO 
exports.deleteLibro = function(req,res,next){
	console.log('DELETE /libros/:id');
	console.log(req.params.id);
    var i,j=[],ban=false,indice,tam=libros.length,idp;
    var parametro=req.params.id;

	console.log('Id enviado:'+parametro);

    for(i=0;i<tam;i++){
    	idp=libros[i].id;
    	
console.log('Id arreglo:'+idp);
    	if(parametro == idp){
    		indice=i;
    		j=libros[i];
    		indice=i;
    		ban=true;
    	}

    }

    console.log("VALOR DE INDICE: "+indice);
    libros.splice(indice,1);


    if(ban==true){
      res.status(200).jsonp(j);
    }

	if(ban==false){
		//res.status(200).jsonp({valor:'Id no encontrado'});
		res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
	}
};


//FUNCION QUE REGRESA LOS AUTORES DE TODOS LOS LIBROS
exports.getAutores = function(req,res,next){
	console.log('GET /autores');
	var i;
	var tam=libros.length;
	var autor,cont=0;
	var arreglo=[];
	for(i=0;i<tam;i++){
		autor=libros[i].autor;
		arreglo[cont]=autor;
		cont++;
	}
	res.status(200).jsonp(arreglo);
};


//FUNCION QUE REGRESA LOS LIBROS DEL AUTOR QUE SE ENVIO
exports.getByAutor = function(req,res,next){
	console.log('GET /autores/:nombre');
	var tam=libros.length;
	var autor=String(req.params.nombre);
	var nom;
	var i,cont=0;
	var n;
	var arreglo=[];
	var ban=false;


	for(i=0;i<tam;i++){
		nom=String(libros[i].autor);
		autor=autor.toUpperCase();
		nom=nom.toUpperCase();
		n=nom.localeCompare(autor);
			
		//Si los string son iguales hace la bandera true y mete a un arreglo los libros que coincidan
		//con el autor
		if(n == 0){
			ban=true;
			arreglo[cont]=libros[i];
			cont++; 
		}
	}

	//Si la bandera es true regresa el arreglo con los libros encontrados
	if(ban==true){
		res.status(200).jsonp(arreglo);
	}
	//Si la bandera es false regresa  el obj json de error
	if(ban==false){
			//res.status(200).jsonp({valor:'No se encontro el autor'});
			res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
	}

		
};


//FUNCION QUE ACTUALIZA EL NOMBRE DEL AUTOR QUE SE ENVIO
exports.updateAutores = function(req,res,next){
	console.log('PUT /autores/:nombre');
	console.log(req.body);
	console.log(req.params.nombre);
	var ban=false,i,tam=libros.length,arreglo=[],cont=0;

	for(i=0; i<tam; i++){
		if(req.params.nombre.toUpperCase()===libros[i].autor.toUpperCase()){
			libros[i].autor=req.body.autor;
			arreglo[cont]=libros[i];
			ban=true;
			cont++;
		}
	}

	if(ban==true){
		res.status(200).jsonp(arreglo);
	}

	if(ban==false){
		//res.status(200).jsonp({valor:'El autor especificado no existe'});
		res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
	}
};

//FUNCION QUE ELIMINA LOS LIBROS DE UN AUTOR ESPECIFICADO
exports.deleteAutor = function(req,res,next){
	console.log('DELETE /autores/:nombre');
	console.log(req.params.nombre);
    var i,j,ban=false,indice=[],tam=libros.length,cont=0;
   
   
console.log("Tamano del arreglo:"+tam);
    for(i=0;i<tam;i++){
  
    	if(req.params.nombre.toUpperCase()===libros[i].autor.toUpperCase()){
    	indice[cont]=libros[i];
        cont++;
        libros[i]='null';
        ban=true;
    	}

    } 

for(j=0 ; j<libros.length ; j++){
	if(libros[j]=='null'){
		libros.splice(j,1);
	}
	}

 
    if(ban==true){
     
     res.status(200).jsonp(indice);
     console.log(libros);
    }

	if(ban==false){
		//res.status(200).jsonp({valor:'El autor especificado no existe'});
		res.status(200).jsonp({valor:'Error 204: No hay contenido para mostrar'});
		console.log(libros);
	} 
};

