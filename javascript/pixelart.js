var myPixelDraw = {
	colorPicked: 0,
	cellColor: "#ecf0f1",
	defaultCells: 30,
	coloring: false,
	fns: {
		calcSize: function(celdas){
			if(celdas===0 || celdas === undefined){
				celdas=myPixelDraw.defaultCells;
			};
			console.log(celdas);
			var cantidadDeCeldas = celdas*celdas;
			$("#container").empty();
			console.log(cantidadDeCeldas);
			for (var i = 0; i < cantidadDeCeldas; i++) {
				$("#container").append("<div class='cell' draggable></div>");
				$(".cell").width(myPixelDraw.container.width()/celdas).height(myPixelDraw.container.width()/celdas);
			};
		},
		reSize: function(){
			$("#sizeit").click(function(){
				console.log('entro');
				var size = $("#resize").val();
				console.log(size);
			if (size >= 0 && size <=50)
			{
				myPixelDraw.fns.calcSize(size);
				myPixelDraw.fns.colorIt();
				myPixelDraw.fns.colorOnDrag();
			};
			if (size>50){
				swal("El valor es incorrecto", "Ingrese nuevo valor entre 1 y 50", "error");
			}
			});
		},
		detectMouseUp: function(){
			$(document).mouseup(function(){
				myPixelDraw.coloring=false;
				console.log(myPixelDraw.coloring);
			}
			);
		},
		colorPalette: function(){
			$("#color-pick>div").each(function(i,e){
				var clase=$(e).attr("class");
				$(e).css("background-color", clase);
			});
		},
		pickColor: function(){
			$("#color-pick>div").on("click", function(){
				var color = $(this).attr("class");
				myPixelDraw.colorPicked=color;
				$(this).parent().find(".select").removeClass("select");
				$(this).addClass("select");
			});
		},
		colorIt: function(){
			$(".cell").mousedown(function(event){
				event.preventDefault();
				myPixelDraw.coloring=true;
				switch(event.which){
					case 1:
							$(this).css("background-color", myPixelDraw.colorPicked);
							break;
					case 2:
							$(this).css("background-color", myPixelDraw.cellColor);
							break;
				}
			});
		},
		colorOnDrag(){
			$(".cell").mousemove(function(evento){
				var x = evento.clientX;
				var y = evento.clientY;
				var element = document.elementFromPoint(x,y);
				if($(element).hasClass("cell") && myPixelDraw.coloring===true){
					if(evento.button === 2){
						$(element).css("background-color", myPixelDraw.cellColor);
					}
					else{
						$(element).css("background-color", myPixelDraw.colorPicked);
					}
				}
			});
		},
		reset: function(){
			$("#reset").on("click", function(e){
				$(".cell").css("background-color", myPixelDraw.cellColor);
			})
		},
		toggleBorders: function(){
			$("#toggle-border").on("click", function(e){
				$(".cell").toggleClass("no-border");
			})
		},
		disableRightClick: function(){
			$("#container").contextmenu(function(){
				return false;
			})
		},
		grabImage: function(){
			$("#grab-it").on("click", function(e){
				var element = document.getElementById("container");
				html2canvas(element, {
					onrendered: function(canvas){
						document.getElementById("imagen").appendChild(canvas);
					}
				})
			})
		}
	},
	init: function(container){
		this.container = container;
		var funciones =  Object.keys(this.fns);
		for (var i = 0; i < funciones.length; i++) {
			myPixelDraw.fns[funciones[i]]();
		}
	}
};

$(document).ready(function(){
	var $container = $("#container");
	
	myPixelDraw.init($container);
});