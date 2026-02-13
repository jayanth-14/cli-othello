export const chunk = (array, length = 1) => {
  const chunked = [];
  const original = [...array];

  while (original.length > 0) {
    chunked.push(original.splice(0, length));
  }

  return chunked;
};
