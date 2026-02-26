
const GRID_SIZE = 6;
const SYMBOLS = [1, 2, 3, 4, 5, 6];

// Box shapes
const BOX_A_ROWS = 2;
const BOX_A_COLS = 3;

const BOX_B_ROWS = 3;
const BOX_B_COLS = 2;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isValid(board, row, col, num) {
  if (!SYMBOLS.includes(num)) return false;

  // Row
  if (board[row].includes(num)) return false;

  // Column
  for (let i = 0; i < GRID_SIZE; i++) {
    if (board[i][col] === num) return false;
  }

  // 2x3 box
  let startRow = row - (row % BOX_A_ROWS);
  let startCol = col - (col % BOX_A_COLS);
  for (let i = 0; i < BOX_A_ROWS; i++) {
    for (let j = 0; j < BOX_A_COLS; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  // 3x2 box
  startRow = row - (row % BOX_B_ROWS);
  startCol = col - (col % BOX_B_COLS);
  for (let i = 0; i < BOX_B_ROWS; i++) {
    for (let j = 0; j < BOX_B_COLS; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function fillBoard(board) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        const nums = [...SYMBOLS];
        shuffle(nums);

        for (const num of nums) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateFullBoard() {
  const board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );
  fillBoard(board);
  return board;
}

function countSolutions(board, limit = 2) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === 0) {
        let count = 0;

        for (const num of SYMBOLS) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            count += countSolutions(board, limit);
            board[row][col] = 0;

            if (count >= limit) return count;
          }
        }
        return count;
      }
    }
  }
  return 1;
}

function removeNumbersUnique(board, maxRemovals = 14) {
  const cells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      cells.push([r, c]);
    }
  }

  shuffle(cells);
  let removed = 0;

  for (const [row, col] of cells) {
    if (removed >= maxRemovals) break;

    const backup = board[row][col];
    board[row][col] = 0;

    if (countSolutions(board) !== 1) {
      board[row][col] = backup;
    } else {
      removed++;
    }
  }
}

export function generatePuzzle(maxRemovals = 24) {
  const fullBoard = generateFullBoard();
  const board = fullBoard.map(row => [...row]);
  removeNumbersUnique(board, maxRemovals);
    return {
    puzzle: board.map(row =>
      row.map(n => (n === 0 ? "" : n.toString()))
    ),
    solution: fullBoard
  };
}

function printBoard(board) {
  board.forEach(row =>
    console.log(row.map(n => (n === 0 ? "." : n)).join(" "))
  );
}

