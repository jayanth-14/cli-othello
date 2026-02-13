import { createBoard, generateBoardStr } from "./src/board.js";
const main = () => {
  const board = createBoard();
  while (true) {
    const boardStr = generateBoardStr(board);
    console.log(boardStr);
    const input = prompt("Enter The cell number in format (row-column):");
    const [row, column] = input.split("-");
    const computedRow = Number(row) - 1;
    const computedColumn = Number(column) - 1;
    const cellNumber = (computedRow * 8) + computedColumn;
    board[cellNumber] = "⚫️";
  }
};

main();
