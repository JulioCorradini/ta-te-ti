var tablero = ["","","","","","","",""];

var jugadorAI = "X";
var jugadorHumano = "O";

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

function minimax (tablero, jugador) {

  var valor = 0;

  var turnoJugadorAI = true;

  if (jugadaGanadora(tablero, jugadorIA)) {
    valor = 1;
  } else if (jugadaGanadora(tablero, jugadorHumano)) {
    valor = -1;
  } else if (!tablero.includes("")) {
    valor = 0;
  };

  turnoJugadorAI = !turnoJugadorAI;

  for (i=0; i<tablero.length; i++){
    
    if (tablero[i] === ""){
      
      tablero[i] === jugador;

      if(turnoJugadorIA) {
        valorDeRegreso = minimax (tablero, jugadorAI);
      } else {
        valorDeRegreso = minimax (tablero, jugadorHumano);
      }

      if (valorDeRegreso > valor) {
        valor = valorDeRegreso;
      }

      tablero[i] === "";
    };

  };

  return valor;
};

// Función para marcar las fichas de la IA
function jugarAI(tablero, jugador) {

  for (i = 0; i < tablero.length; i++) {
    if (tablero[i] === "") {

      valor = minimax(tablero, jugador);

      if (valor > 0 ) {

      };

    };
  };

};