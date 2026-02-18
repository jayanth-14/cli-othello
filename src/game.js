import { generateBoardStr } from "./board.js";
import { red } from "@std/fmt/colors";
import { getCellsToFlip, scan } from "./directions.js";

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

export const computeCellIndex = ({ row, column }) => (row * 8) + column;

const updateBoard = (board, cellNumber, disc) => {
  board[cellNumber] = disc;
};

const displayBoard = (board) => {
  const boardStr = generateBoardStr(board);
  console.log(boardStr);
};

const getDiscs = function* () {
  const discs = ["⚪️", "⚫️"];
  while (true) {
    yield discs.reverse();
  }
};

export const startGame = (board) => {
  const discGenerator = getDiscs();
  while (true) {
    try {
      displayBoard(board);
      const [currentDisc, opponentDisc] = discGenerator.next().value;
      const coordinates = getCoordinates(currentDisc);
      validateCoordinates(board, coordinates);
      const cellNumber = computeCellIndex(coordinates);
      const cellsToFlip = getCellsToFlip(
        board,
        cellNumber,
        currentDisc,
        opponentDisc,
      );
      updateBoard(board, cellNumber, currentDisc);
      cellsToFlip.forEach((cell) => updateBoard(board, cell, currentDisc));
    } catch (error) {
      console.log(red(error.message));
    }
  }
};
