//const { resolve } = require('path');
//const readline = require('readline');
/*const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/
const cells = document.querySelectorAll(".cell");

/*cells.forEach((cell)=>{
  cell.addEventListener("click", ()=>{
    if (!cell.textContent) {
      cell.textContent = "O";
      cell.classList.add("occupied");
    };
  });
});*/

// Variables
var tablero = ["-","-","-","-","-","-","-","-","-"];
var jugadorAI = "X";
var jugadorHumano = "O";
var turnoJugadorAI = true;

// Actualiza las celdas según el contenido del array 'tablero'
function actualizarTablero() {
  cells.forEach((cell, index) => {
      cell.textContent = tablero[index]; // Asigna el valor del array a la celda
  });
};

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
};

// Función para marcar las fichas de la IA
function jugarAI(tablero) {

  var jugadaDeAI = minimax(tablero, jugadorAI).indice;
  console.log(jugadaDeAI);
  tablero[jugadaDeAI] = jugadorAI;
  actualizarTablero();

};


// Turno del jugador humano
/*async function turnoHumano() {

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
  
};*/

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

  //await elejirTurno();

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

// Función para elejir el turno.
/*async function elejirTurno (){

  return new Promise((resolve)=>{

    // Imprime el tablero por consola.
    for (let i = 0; i < 3; i++) {
      let row = "";
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        row += tablero[index] + " ";
      }
      console.log(row);
    };

    rl.question("¿Quiere empezar primero? Presione S para Sí o N para No ", (input) => {

      const respuesta = input.toLocaleLowerCase();

      if(respuesta === "s") {
        turnoJugadorAI = false;
      } else {
        if (respuesta === "n") {
          turnoJugadorAI = true;
        };
      }

      resolve();

    });

  });

};*/

jugarTaTeTi();