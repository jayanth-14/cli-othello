import { computeCellIndex } from "./game.js";

export const scan = (
  board,
  index,
  offset,
  currentDisc,
  opponentDisc,
  predicate,
) => {
  let current = index + offset;
  const cells = [];
  while (predicate(current)) {
    const currentCell = board[current];
    if (currentCell === opponentDisc) {
      cells.push(current);
      current += offset;
      continue;
    }

    if (currentCell === currentDisc) {
      return cells;
    }

    return [];
  }

  return [];
};

const getRowLimit = (cellNumber, offset) =>
  ((Math.floor(cellNumber / 8) + offset) * 8) - 1;

export const getCellsToFlip = (
  board,
  cell,
  currentDisc,
  opponentDisc,
) => {
  const directions = {
    N: {
      offset: -8,
      predicate: (cell) => cell > 0,
    },
    NE: {
      offset: -7,
      predicate: (cell) => cell > 0,
    },
    E: {
      offset: +1,
      predicate: (cell) => cell < getRowLimit(cell, 1),
    },
    SE: {
      offset: +9,
      predicate: (cell) => cell < 64,
    },
    S: {
      offset: +8,
      predicate: (cell) => cell < 64,
    },
    SW: {
      offset: +7,
      predicate: (cell) => cell < 57,
    },
    W: {
      offset: -1,
      predicate: (cell) => cell > getRowLimit(cell, 0),
    },
    NW: {
      offset: -9,
      predicate: (cell) => cell > 0,
    },
  };
  const directionProperties = Object.values(directions);
  const cells = directionProperties.flatMap((property) =>
    scan(
      board,
      cell,
      property.offset,
      currentDisc,
      opponentDisc,
      property.predicate,
    )
  );
  return cells;
};
