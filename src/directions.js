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
