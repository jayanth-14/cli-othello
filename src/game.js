const isValidCoordinates = ({ row, column }) =>
  column > 0 && column < 8 && row > 0 &&
  row < 8;

const computeCoordinate = (coordinate) => Number(coordinate) - 1;

const parseCoordinates = (userInput) => {
  const [row, column] = userInput.split("-");

  const computedRow = computeCoordinate(row);
  const computedColumn = computeCoordinate(column);

  return { row: computedRow, column: computedColumn };
};

export const getCoordinates = () => {
  const userInput = prompt("Enter The cell number in format (row-column):");
  const coordinates = parseCoordinates(userInput);

  if (!isValidCoordinates(coordinates)) {
    throw new Error(`Invalid positions : ${userInput}`);
  }

  return coordinates;
};
