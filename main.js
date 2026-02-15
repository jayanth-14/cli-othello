import { createBoard, generateBoardStr } from "./src/board.js";
import {
  computeCellIndex,
  getCoordinates,
  updateBoard,
  validateCoordinates,
} from "./src/game.js";
import { red } from "@std/fmt/colors";
const main = () => {
  const board = createBoard();
  while (true) {
    try {
      const boardStr = generateBoardStr(board);
      console.log(boardStr);
      const coordinates = getCoordinates(board);
      validateCoordinates(board, coordinates);
      const cellNumber = computeCellIndex(coordinates);
      updateBoard(board, cellNumber);
    } catch (error) {
      console.log(red(error.message));
    }
  }
};

main();
