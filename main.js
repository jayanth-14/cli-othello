import { createBoard } from "./src/board.js";
import { startGame } from "./src/game.js";

const main = () => {
  const board = createBoard();
  startGame(board);
};

main();
