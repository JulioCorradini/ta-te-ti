const cells = document.querySelectorAll(".cell");
const buttonIniciar = document.getElementById("button-iniciar");
const buttonJugarPrimero = document.getElementById("button-jugar-primero");
const buttonJugarSegundo = document.getElementById("button-jugar-segundo");
const buttonReiniciar = document.getElementById("button-reiniciar");
const message = document.getElementById("message");

// Esconder los botones.
buttonJugarPrimero.style.display = "none";
buttonJugarSegundo.style.display = "none";
buttonReiniciar.style.display = "none";

// Variables
var tablero = ["-","-","-","-","-","-","-","-","-"];
var jugadorAI = "X";
var jugadorHumano = "O";
var turnoJugadorAI = true;

// Actualiza las celdas según el contenido del array 'tablero' luego de la jugada de la IA
function actualizarTableroConJugadaDeIA() {
  cells.forEach((cell, index) => {
      cell.textContent = tablero[index]; // Asigna el valor del array a la celda
      actualizarTableroConJugadaDeHumano();
  });
};

// Atualiza las celdas según el contenido del array 'tablero' luego de la jugada del Humano
function actualizarTableroConJugadaDeHumano() {
  console.log("Turno del Humano");

      cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          if ((cell.textContent === "" || cell.textContent === "-") && !cell.classList.contains("occupied") && !juegoTerminado(tablero)) {
            cell.textContent = jugadorHumano;
            cell.classList.add("occupied");
            tablero[index] = jugadorHumano;
            jugarAI(tablero);
        };
      });
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
    actualizarTableroConJugadaDeIA();
    if (!juegoTerminado(tablero)){
      actualizarTableroConJugadaDeIA();
    }else {
      if (jugadaGanadora(tablero, jugadorAI)) {
        includeMessage("JUEGO TERMINADO. GANADOR X");
      }else {
        if (jugadaGanadora(tablero, jugadorHumano)){
          includeMessage("JUEGO TERMINADO. GANADOR O");
        } else {
          if (!tablero.includes("-")){
            includeMessage("JUEGO TERMINADO. EMPATE");
          };
        };
      };
      return;
    };

};

function juegoTerminado(tablero) {
  return jugadaGanadora(tablero, jugadorAI) || jugadaGanadora(tablero, jugadorHumano) || !tablero.includes("-");
};

// Función Jugar
function jugar(){
  if (turnoJugadorAI) {

    jugarAI(tablero);
  
  } else {

    actualizarTableroConJugadaDeHumano();

  };
};

// Función para elegir turnos
function elegirTruno(){

  buttonJugarPrimero.addEventListener("click", () =>{
    turnoJugadorAI = false;
    jugar();
    buttonJugarPrimero.style.display = "none";
    buttonJugarSegundo.style.display = "none";
  });

  buttonJugarSegundo.addEventListener("click", () =>{
    turnoJugadorAI = true;
    jugar();
    buttonJugarPrimero.style.display = "none";
    buttonJugarSegundo.style.display = "none";
  });

};

// Función para reiniciar el juego
function reiniciar() {
  location.reload();
};

// Función para esconder y revelar los botones
function revelarBotones(){
  buttonIniciar.style.display = "none"
  buttonJugarPrimero.style.display = "block";
  buttonJugarSegundo.style.display = "block";
  buttonReiniciar.style.display = "block"
};

// Función para mostrar mensaje de finalización
function includeMessage(messageText){
  var innerMessage = document.createElement("p");
  innerMessage.innerText = messageText;
  innerMessage.classList.add("message-text");
  message.appendChild(innerMessage);
};