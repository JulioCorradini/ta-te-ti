const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Variables
var tablero = ["-","-","-","-","-","-","-","-","-"];
var jugadorAI = "X";
var jugadorHumano = "O";
var turnoJugadorAI = true;

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
  } else if (!talbleroAuxiliar.includes("-")) {
    resultadoMiniMax.valor = 0;
  };

  for (let i = 0; i < talbleroAuxiliar.length; i++){
     
    if (talbleroAuxiliar[i] === "-"){
      
      talbleroAuxiliar[i] = jugador;

      var valorDeRegreso;

      if(turnoJugadorAI) {
        turnoJugadorAI = !turnoJugadorAI;
        valorDeRegreso = minimax (talbleroAuxiliar, jugadorAI).valor;
      } else {
        turnoJugadorAI = !turnoJugadorAI;
        valorDeRegreso = minimax (talbleroAuxiliar, jugadorHumano).valor;
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


// Turno del jugador humano
function turnoHumano() {
  

    // Imprime el tablero por consola.
    for (let i = 0; i < 3; i++) {
      let row = "";
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        row += tablero[index] + " ";
      }
      console.log(row);
    };
  
    rl.question("Elija el casillero (del 1 al 9) que desea marcar: ", (input) => {

      const jugadaDeHumano = parseInt(input);
      if (tablero[jugadaDeHumano - 1] === "-") {
        tablero[jugadaDeHumano - 1] = "O";
      }

      rl.close();
  
      // Imprime el tablero por consola.
      for (let i = 0; i < 3; i++) {
        let row = "";
        for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          row += tablero[index] + " ";
        }
        console.log(row);
      };

    });
  
  
};

// Turno del jugador IA
function turnoIA() {
  

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
  
    
};

if(turnoJugadorAI) { // HAY QUE LOGRAR QUE LUEGO DEL TURNO DEL HUMANO VUELVA A LLAMARSE AL TURNO DE LA IA

    turnoIA();
    turnoHumano();

};