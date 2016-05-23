numAleatorios = 121, matriz = 11,capturado  = 0, helps = 0, puntaje = 0, incrementar = 10, puntajeayuda = 5;
numeros = [], numAcertados = [];
minutos = 29, segundos = 60;



nuevoEscenario(); // En La etiqueta <div id = "escenario"> que se encuenta en Html llamamos la función nuevoEscenario desde la que dibujamos la Matriz.
setInterval("dataTime()",1000); 

function nuevoEscenario(){
	txt = "<table>",
    nomID   = "";
    cuadrante = [];
    for(fila = 0; fila < matriz; fila ++){  
    	//Con los dos ciclos, dubujamos una matriz de (11 * 11) donde se encontrarán los 121 números.
        txt += "<tr>";
        for(col = 0; col < matriz; col ++){
            nomID = fila + "_" + col;
            txt += "<td id = 'td_"+(nomID)+"'>";
            txt += "</td>";
            id = "td_"+col+"_"+fila;
            cuadrante.push(id);
        };
        txt += "</tr>";
    };
    txt += "</table>";
    nom_div("escenario").innerHTML = txt;
};

function llenarEscenario(){
	numeros = [];
	for(i = 0; i < numAleatorios; i ++){	
		num = Math.floor(Math.random() * 121) + 1;
		if(numeros.indexOf(num) < 0){
    		numeros.push(num);
		}
    	else{
    		numAleatorios += 1;
    	}
	};
	for(i = 0; i < cuadrante.length; i ++){
		nom_div(cuadrante[i]).innerHTML = numeros[i];
		nom_div(cuadrante[i]).style.backgroundColor = coloresAleatorios();
	};
};

function acertar(){
    valida = true;
    while(valida){
        num = Math.floor(Math.random() * 121) + 1;
        if(numAcertados.indexOf(num) < 0){
            //console.log('hello world');
            console.log(num);
            numAcertados.push(num);
            nom_div("encuentre").innerHTML = num;
            valida =false;        
        }
        if(numAcertados.length == cuadrante.length){
            sweetAlert("Felicitaciones",'haz desperdiciado 5 valiosos minutos de tu vida', "success");
            reinicio();
            valida =false; 
        }
    }
};

function dataTime(){
    segundos --
    if(segundos == -1){
        segundos = 59;
        minutos --
        console.log(minutos + ":" + segundos);
        if(minutos == -1 && segundos == 59){
            sweetAlert("Perdio", "Por Lento", "error");
            puntaje = 0;
            minutos = 4;
            
            reinicio();
        }
    }
    tiempo = "Tiempo restante: " + minutos + ":" + segundos; 
    nom_div("reloj").innerHTML = tiempo;
};

function reinicio(){
    puntaje = 0, numAleatorios=121, helps=0, minutos=29,segundos=60;
    ayudita = false;
    numAcertados = [];
    nom_div('puntaje').innerHTML = puntaje;
    nom_div("ayudas").style.display="block";
    llenarEscenario();
    acertar();
};

document.addEventListener('click',function(e){
    num  = nom_div("encuentre").innerHTML;
	dato = e.target.id;
    if(cuadrante.indexOf(dato) >= 0){
        capturado = nom_div(dato).innerHTML;
        console.log(capturado);
        if(capturado == num){
            console.log('si');
            nom_div(dato).innerHTML = " ";
            nom_div(dato).style.backgroundColor="white";
            nom_div(dato).style.border="white";
            if(ayudita){
                puntaje = puntaje + puntajeayuda;
                ayudita = false;
                helps++;
            }
            else{
               puntaje = puntaje + incrementar;
            
            }
            nom_div('puntaje').innerHTML = puntaje;
            acertar(); 
        }
    }
});

nom_div("ayudas").addEventListener('click', function(event){
    if(helps < 3){
        num = nom_div("encuentre").innerHTML;
        for(i = 0 ; i < cuadrante.length; i ++){
            ayuda = nom_div(cuadrante[i]).innerHTML;
            if(num == ayuda){
                nom_div(cuadrante[i]).style.backgroundColor="white";
                nom_div(cuadrante[i]).style.border="white";
                ayudita = true;
                //sweetAlert("se te ha colaborado",'help + "veces"', "success");
            }  
        }
        console.log(helps);
    }
    else{
        sweetAlert("I am sorry for you", "Se agotaron las ayudas", "error");
        nom_div("ayudas").style.display="none";
    }
});

nom_div("iniciar").addEventListener('click', function(event){  
    reinicio(); 
});

function nom_div(div){
    return document.getElementById(div);
};

function coloresAleatorios() {
        return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
   (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);                                      // from http://www.paulirish.com/2009/random-hex-color-code-snippets/   
};
