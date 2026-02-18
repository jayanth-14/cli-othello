import { chunk } from "./utils.js";

const generateBoard = () => Array.from({ length: 8 * 8 }, () => "⬜");

const setDefaultDiscs = (board) => {
  board[27] = "⚪️";
  board[28] = "⚫️";
  board[35] = "⚫️";
  board[36] = "⚪️";
};

export const createBoard = () => {
  const board = generateBoard();
  setDefaultDiscs(board);
  return board;
};

const generateRowString = (row, i) => `${i + 1}` + row.join("") + "\n";

export const generateBoardStr = (board) => {
  const rows = chunk(board, 8);
  const columnIndies = "\n  1 2 3 4 5 6 7 8 \n";
  return rows.reduce(
    (string, row, i) => string + generateRowString(row, i),
    columnIndies,
  );
};
