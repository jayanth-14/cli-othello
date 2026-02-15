import { beforeAll, describe, it } from "@std/testing/bdd";
import { assert } from "@std/assert";
import { scan } from "../src/directions.js";
import { createBoard } from "../src/board.js";

describe("Testing scan", () => {
  let board;

  describe("Testing for the north", () => {
    beforeAll(() => {
      board = createBoard();
      board[21] = "⚫️";
      board[13] = "⚫️";
      board[5] = "⚪️";
    });
    it("scan should return an array of black cells", () => {
      const cells = scan(
        board,
        27,
        -8,
        "⚪️",
        "⚫️",
        (currIndex) => currIndex > 0,
      );
      assert(cells, [21, 13]);
    });
    it("scan should return single cell", () => {
      const cells = scan(
        board,
        35,
        -8,
        "⚫️",
        "⚪️",
        (currIndex) => currIndex > 0,
      );
      assert(cells, [27]);
    });

    it("Should return an empty array", () => {
      const cells = scan(
        board,
        36,
        -8,
        "⚪️",
        "⚫️",
        (currIndex) => currIndex > 0,
      );
      assert(cells, []);
    });

    it("Should return empty array when at first row", () => {
      const cells = scan(
        board,
        5,
        -8,
        "⚫️",
        "⚪️",
        (currIndex) => currIndex > 0,
      );
      assert(cells, []);
    });
  });

  describe("Testing for south", () => {
    beforeAll(() => {
      board = createBoard();
      board[35] = "⚫️";
      board[43] = "⚫️";
      board[51] = "⚪️";
    });

    it("scan should return captured cells going south", () => {
      const cells = scan(
        board,
        27,
        8,
        "⚪️",
        "⚫️",
        (currIndex) => currIndex < 64,
      );
      assert(cells, [35, 43]);
    });

    it("Should return empty if no closing piece", () => {
      const cells = scan(
        board,
        19,
        8,
        "⚪️",
        "⚫️",
        (currIndex) => currIndex < 64,
      );
      assert(cells, []);
    });

    it("Should return empty if starting at last row", () => {
      const cells = scan(
        board,
        60,
        8,
        "⚪️",
        "⚫️",
        (currIndex) => currIndex < 64,
      );
      assert(cells, []);
    });
  });

  describe("Testing for east", () => {
    beforeAll(() => {
      board = createBoard();
      board[28] = "⚫️";
      board[29] = "⚫️";
      board[30] = "⚪️";
    });

    it("scan should return captured cells going east", () => {
      const cells = scan(
        board,
        27,
        1,
        "⚪️",
        "⚫️",
        (currIndex) => Math.floor(currIndex / 8) === Math.floor(27 / 8),
      );
      assert(cells, [28, 29]);
    });

    it("Should return empty at right edge", () => {
      const cells = scan(
        board,
        31,
        1,
        "⚪️",
        "⚫️",
        (currIndex) => Math.floor(currIndex / 8) === Math.floor(31 / 8),
      );
      assert(cells, []);
    });
  });

  describe("Testing for west", () => {
    beforeAll(() => {
      board = createBoard();
      board[26] = "⚫️";
      board[25] = "⚫️";
      board[24] = "⚪️";
    });

    it("scan should return captured cells going west", () => {
      const cells = scan(
        board,
        27,
        -1,
        "⚪️",
        "⚫️",
        (currIndex) => Math.floor(currIndex / 8) === Math.floor(27 / 8),
      );
      assert(cells, [26, 25]);
    });

    it("Should return empty at left edge", () => {
      const cells = scan(
        board,
        24,
        -1,
        "⚪️",
        "⚫️",
        (currIndex) => Math.floor(currIndex / 8) === Math.floor(24 / 8),
      );
      assert(cells, []);
    });
  });
});
