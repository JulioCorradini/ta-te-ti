// Variables
var tablero = ["O","-","-","-","-","-","-","-","-"];
var jugadorAI = "X";
var jugadorHumano = "O";
var turnoJugadorAI = true;
//var valoresDeRegreso = [];

// Función para determinar los patrones de jugadas ganadoras.
function jugadaGanadora (tablero, jugador) {
  
  if (tablero[0] === jugador && tablero[1] === jugador && tablero[2] === jugador ||
      tablero[3] === jugador && tablero[4] === jugador && tablero[5] === jugador ||
      tablero[6] === jugador && tablero[7] === jugador && tablero[8] === jugador ||
      tablero[0] === jugador && tablero[3] === jugador && tablero[6] === jugador ||
      tablero[1] === jugador && tablero[4] === jugador && tablero[7] === jugador ||
      tablero[2] === jugador && tablero[5] === jugador && tablero[8] === jugador ||
      tablero[0] === jugador && tablero[4] === jugador && tablero[8] === jugador ||
      tablero[2] === jugador && tablero[4] === jugador && tablero[6] === jugador) {
        return true
  }
};

// Función miniMax.
function minimax (tablero, jugador,) {

  var talbleroAuxiliar = tablero.slice();
  
  var resultadoMiniMax = {
                          valor: 0,
                          indice: ""
                          };

  if (jugadaGanadora(talbleroAuxiliar, jugadorAI)) {
    resultadoMiniMax.valor = 1;
  } else if (jugadaGanadora(talbleroAuxiliar, jugadorHumano)) {
    resultadoMiniMax.valor = -1;
  } else if (!talbleroAuxiliar.includes("")) {
    resultadoMiniMax.valor = 0;
  };

  for (i=0; i<talbleroAuxiliar.length; i++){
    
    if (talbleroAuxiliar[i] === "-"){
      
      talbleroAuxiliar[i] = jugador;

      var valorDeRegreso;

      if(turnoJugadorAI) {
        turnoJugadorAI = !turnoJugadorAI;
        valorDeRegreso = minimax (talbleroAuxiliar, jugadorAI).valor;
        //valoresDeRegreso.push = minimax (tablero, jugadorAI).valor;
      } else {
        turnoJugadorAI = !turnoJugadorAI;
        valorDeRegreso = minimax (talbleroAuxiliar, jugadorHumano).valor;
        //valoresDeRegreso.push = minimax (tablero, jugadorAI).valor;
      }

      if (valorDeRegreso > resultadoMiniMax.valor) {
        resultadoMiniMax.valor = valorDeRegreso;
        resultadoMiniMax.indice = i;
      }

      talbleroAuxiliar[i] = "-";

    };

  };

  console.log(resultadoMiniMax);
  return resultadoMiniMax;

};

// Función para marcar las fichas de la IA
function jugarAI(tablero) {

  var jugadaDeAI = minimax(tablero, jugadorAI).indice;
  console.log(jugadaDeAI);
  tablero[jugadaDeAI] = jugadorAI;

};

// Imprime el tablero por consola.
for (let i = 0; i < 3; i++) {
  let row = "";
  for (let j = 0; j < 3; j++) {
    const index = i * 3 + j;
    row += tablero[index] + " ";
  }
  console.log(row);
};

jugarAI(tablero);

// Imprime el tablero por consola.
for (let i = 0; i < 3; i++) {
  let row = "";
  for (let j = 0; j < 3; j++) {
    const index = i * 3 + j;
    row += tablero[index] + " ";
  }
  console.log(row);
};

//console.log(valoresDeRegreso);