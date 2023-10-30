const { resolve } = require('path');
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

function minimax(tablero, jugador) {
  // Función auxiliar para evaluar el estado del juego y retornar su valor.
  function evaluar(tablero) {
    if (jugadaGanadora(tablero, jugadorAI)) {
      return 1; // La IA gana
    } else if (jugadaGanadora(tablero, jugadorHumano)) {
      return -1; // El humano gana
    } else if (!tablero.includes("-")) {
      return 0; // Empate
    }
    return null; // El juego no ha terminado
  }

  // Evaluar el estado actual del juego.
  const resultado = evaluar(tablero);

  if (resultado !== null) {
    return { valor: resultado, indice: -1 }; // Devolver el valor y un índice inválido.
  }

  // Inicializar una lista de resultados para almacenar los valores y los índices de las jugadas posibles.
  const resultados = [];

  // Generar las jugadas posibles y evaluarlas recursivamente.
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === "-") {
      tablero[i] = jugador;
      const valorDeRegreso = minimax(tablero, jugador === jugadorAI ? jugadorHumano : jugadorAI).valor;
      resultados.push({ valor: valorDeRegreso, indice: i });
      tablero[i] = "-";
    }
  }

  // Determinar la mejor jugada basada en el jugador actual.
  let mejorResultado;
  if (jugador === jugadorAI) {
    // La IA busca maximizar su valor.
    mejorResultado = resultados.reduce((max, resultado) => (resultado.valor > max.valor ? resultado : max), { valor: -Infinity });
  } else {
    // El humano busca minimizar el valor de la IA.
    mejorResultado = resultados.reduce((min, resultado) => (resultado.valor < min.valor ? resultado : min), { valor: Infinity });
  }

  return mejorResultado;
}

// Función miniMax.
/*function minimax (tablero, jugador) {

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

};*/

// Función para marcar las fichas de la IA
function jugarAI(tablero) {

  var jugadaDeAI = minimax(tablero, jugadorAI).indice;
  console.log(jugadaDeAI);
  tablero[jugadaDeAI] = jugadorAI;

};


// Turno del jugador humano
async function turnoHumano() {

  return new Promise((resolve)=>{

    rl.question("Elija el casillero (del 1 al 9) que desea marcar: ", (input) => {

      const jugadaDeHumano = parseInt(input);
      if (tablero[jugadaDeHumano - 1] === "-") {
        tablero[jugadaDeHumano - 1] = "O";
      }
  
      // Imprime el tablero por consola.
      for (let i = 0; i < 3; i++) {
        let row = "";
        for (let j = 0; j < 3; j++) {
          const index = i * 3 + j;
          row += tablero[index] + " ";
        }
        console.log(row);
      };

      resolve();

    });

  });
  
};

// Turno del jugador IA
function turnoIA() {
  
  return new Promise ((resolve)=> {

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

    resolve();

  });
};

function juegoTerminado(tablero) {
  return jugadaGanadora(tablero, jugadorAI) || jugadaGanadora(tablero, jugadorHumano) || !tablero.includes("-");
};

async function jugarTaTeTi () {

  while (!juegoTerminado(tablero)) {

    if (turnoJugadorAI) {
      console.log("turno de la IA");
      await turnoIA();
      turnoJugadorAI = false;

    } else {
      console.log("turno del Humano");
      await turnoHumano();
      turnoJugadorAI = true;

    }

  };

  console.log("Juego terminado.");

  rl.close();

};

jugarTaTeTi();