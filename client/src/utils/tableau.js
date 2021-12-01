export function split(array) {
  return {
    premier: array.slice(0, array.length / 2),
    second: array.slice(array.length / 2),
  };
}
