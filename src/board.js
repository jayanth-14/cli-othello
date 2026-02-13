import { chunk } from "./utils.js";

const generateBoard = () => Array.from({ length: 8 * 8 }, () => "⬜");

const setDefaultDiscs = (board) => {
  board[27] = "⚪";
  board[28] = "⚫️";
  board[35] = "⚫️";
  board[36] = "⚪️";
};

export const createBoard = () => {
  const board = generateBoard();
  setDefaultDiscs(board);
  return board;
};

export const generateBoardStr = (board) => {
  const rows = chunk(board, 8);
  return rows.reduce(
    (string, row) => string + row.join("") + "\n",
    "",
  );
};
