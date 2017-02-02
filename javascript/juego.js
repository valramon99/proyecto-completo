var rompecabezas = {
	filas:[[],[],[]],
	espacioVacio:{
		fila:2,
		columna:2
	},
	iniciar:function(juego){
		console.log(juego);
		this.instalarPiezas(juego);
		this.mezclarFichas(100);
		this.capturarTeclas();
		this.mezclarDeNuevo();
	},
	mezclarFichas: function(veces){
		if (veces <= 0) {return;}
			var that = this;
			var funciones = ["moverHaciaAbajo", "moverHaciaArriba", "moverHaciaLaIzquierda", "moverHaciaLaDerecha"];
			var numeroRandom = Math.floor(Math.random() * funciones.length);
			var nombreDeFuncion = funciones[numeroRandom];
			this[nombreDeFuncion]();
			setTimeout(function() {
				that.mezclarFichas(--veces);
			}, 100);
		$("#reset-game").fadeOut(1500);
	},
	mezclarDeNuevo: function(){
		var that = this;
		$("#reset-game").on("click", function(e){
				that.mezclarFichas(100);
		})
	},
	chequearSiGano: function(){
		for (var fila = 0; fila<this.filas.length; fila++) {
			for (var columna = 0; columna<this.filas.length; columna++) {
				var ficha = this.filas[fila][columna];
				if (ficha && !(ficha.fila===fila && ficha.columna===columna)){
					return false;
				}
			}
		}
		swal("Felicidades", "Has ganado!", "success");
		$("#reset-game").fadeIn(1500);
	},
	moverHaciaAbajo:function(){
		if(this.espacioVacio.fila - 1 > -1){
			var filaOrigen = this.espacioVacio.fila-1;
    		var columnaOrigen = this.espacioVacio.columna;
    		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
		}
		
	},
	moverHaciaArriba:function(){
		if(this.espacioVacio.fila + 1 < this.filas.length){
			var filaOrigen = this.espacioVacio.fila+1;
    		var columnaOrigen = this.espacioVacio.columna;
    		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
	},
	moverHaciaLaIzquierda:function(){
		if(this.espacioVacio.columna+1 < this.filas.length){
			var filaOrigen = this.espacioVacio.fila;
    		var columnaOrigen = this.espacioVacio.columna+1;
    		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
	},
	moverHaciaLaDerecha:function(){
		if(this.espacioVacio.columna-1 > -1){
			var filaOrigen = this.espacioVacio.fila;
   			var columnaOrigen = this.espacioVacio.columna-1;
    		this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
    	}
	},
	moverFichaFilaColumna:function(fila,columna){
		var ficha = this.filas[fila][columna];
		ficha.pieza.css({
			top:this.espacioVacio.fila*200+"px",
			left:this.espacioVacio.columna*200+"px"
		});
	},
	guardarEspacioVacio:function(fila, columna){
		var filaVacia = this.espacioVacio.fila;
		var colVacia = this.espacioVacio.columna;
		this.filas[filaVacia][colVacia] = this.filas[fila][columna];
		this.filas[fila][columna]= null;
		this.espacioVacio.fila = fila;
		this.espacioVacio.columna = columna;		
	},
	intercambiarPosicionConEspacioVacio:function(fila, columna){
		var identificarFicha = this.filas[fila][columna];
		this.moverFichaFilaColumna(fila,columna);
		this.guardarEspacioVacio(fila,columna);
	},
	instalarPiezas: function(juego){
		var numero = 1;
		for (var fila = 0; fila < 3; fila++) {
			for (var columna = 0; columna < 3; columna++) {
				if (fila==this.espacioVacio.fila && columna==this.espacioVacio.columna) {
					this.filas[fila][columna]=null;
				}
				else {	
					var pieza = this.crearPieza(numero, fila, columna);
					juego.append(pieza.pieza);
					this.filas[fila][columna]=pieza;
					numero++;
				}
			}
		}
	},
	capturarTeclas:function(){
		var that = this;
		$(document).keydown(function(e){
			switch(e.which){
				case 38:
						that.moverHaciaArriba();
						break;
				case 39:
						that.moverHaciaLaDerecha();
						break;
				case 40:
						that.moverHaciaAbajo();
						break;
				case 37:
						that.moverHaciaLaIzquierda();
						break;
			}
			that.chequearSiGano();
		})
	},
	crearPieza: function(numero, fila, columna){
 	var nuevoElemento = $('<div>');
 	nuevoElemento.addClass("pieza");
 	nuevoElemento.css({
 		backgroundImage:"url('piezas/"+numero+".jpg')",
 		top:fila*200,
 		left:columna*200
 	});
		var objeto = {};
		objeto.pieza=nuevoElemento;
		objeto.fila=fila;
		objeto.columna=columna;
		objeto.numero=numero;
		return objeto;
}
};
$(document).ready(function(){
	var $juego=$("#juego");
	rompecabezas.iniciar($juego);
	$("#reset-game").hide();
});