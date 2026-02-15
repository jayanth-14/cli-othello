import { generateBoardStr } from "./board.js";
import { red } from "@std/fmt/colors";

const isValidCoordinates = ({ row, column }) =>
  column >= 0 && column < 8 && row >= 0 &&
  row < 8;

const validateCoordinates = (board, coordinates) => {
  const [row, column] = [coordinates.row + 1, coordinates.column + 1];

  if (!isValidCoordinates(coordinates)) {
    throw new Error(`Invalid positions : ${row} - ${column}`);
  }

  const cellIndex = computeCellIndex(coordinates);

  if (board[cellIndex] !== "⬜") {
    throw new Error(`Selected cell is already occupied : ${row} - ${column}`);
  }
};

const computeCoordinate = (coordinate) => Number(coordinate) - 1;

const parseCoordinates = (userInput) => {
  const [row, column] = userInput.split("-");

  const computedRow = computeCoordinate(row);
  const computedColumn = computeCoordinate(column);

  return { row: computedRow, column: computedColumn };
};

const isValidInput = (userInput) => /\d-\d/.test(userInput);

const getCoordinates = (disc) => {
  const userInput = prompt(`It's ${disc} turn. Format (row-column):`);
  if (!isValidInput(userInput)) {
    throw new Error(
      `Invalid Format, follow the specified format: ${userInput}`,
    );
  }

  const coordinates = parseCoordinates(userInput);
  return coordinates;
};

const computeCellIndex = ({ row, column }) => (row * 8) + column;

const updateBoard = (board, cellNumber, disc = "⚫️") => {
  board[cellNumber] = disc;
};

const displayBoard = (board) => {
  const boardStr = generateBoardStr(board);
  console.log(boardStr);
};

export const startGame = (board) => {
  const discs = ["⚪️", "⚫️"];
  let i = 0;
  while (true) {
    try {
      displayBoard(board);
      const currentDisc = discs[i++ % 2];
      const coordinates = getCoordinates(currentDisc);
      validateCoordinates(board, coordinates);
      const cellNumber = computeCellIndex(coordinates);
      updateBoard(board, cellNumber, currentDisc);
    } catch (error) {
      console.log(red(error.message));
    }
  }
};
