const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.textContent) {
      cell.textContent = currentPlayer;
      cell.classList.add("occupied");
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});