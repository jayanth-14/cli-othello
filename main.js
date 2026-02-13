import { createBoard, generateBoardStr } from "./src/board.js";
import { getCoordinates } from "./src/game.js";
const main = () => {
  const board = createBoard();
  while (true) {
    const boardStr = generateBoardStr(board);
    console.log(boardStr);
    const { row, column } = getCoordinates();
    console.log(row, column);
    const cellNumber = (row * 8) + column;
    board[cellNumber] = "⚫️";
  }
};

main();
