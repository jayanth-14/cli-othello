import { createBoard, generateBoardStr } from "./src/board.js";
const main = () => {
  const board = createBoard();
  const boardStr = generateBoardStr(board);
  console.log(boardStr);
};

main();
