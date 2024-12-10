const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
// let solver = SudokuSolver();
let solver = new Solver();

suite('Unit Tests', () => {

    // Logic handles a valid puzzle string of 81 characters
    test('Logic handles a valid puzzle string of 81 characters', () => {
        const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        let solution = solver.validate(puzzle);
        assert.equal(solution, true);
        solution = solver.validate('111');
        assert.equal(solution, false);
    });

   // Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
    const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37x';
    assert.isFalse(solver.validate(input));
    });

  // Logic handles a puzzle string that is not 81 characters in length
  test('Logic handles a puzzle string that is not 81 characters in length', function() {
    const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.';
    assert.isFalse(solver.validate(input));
  });
  
  // Logic handles a valid row placement
  test('Logic handles a valid row placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRowPlacement(puzzleString, 1, 1, 7));
  });


  // Logic handles a valid column placement
  test('Logic handles a valid column placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkColPlacement(puzzleString, 1, 1, 7));
  });

  
  // Logic handles an invalid row placement
  test('Logic handles an invalid row placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkRowPlacement(puzzleString, 1, 1, 9));
  });
  
  
  
  // Logic handles an invalid column placement
  test('Logic handles an invalid column placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkColPlacement(puzzleString, 1, 1, 5));
  });
  
  // Logic handles a valid region (3x3 grid) placement
  test('Logic handles a valid region (3x3 grid) placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 1, 1, 7));
  });
  
  // Logic handles an invalid region (3x3 grid) placement
  test('Logic handles an invalid region (3x3 grid) placement', function() {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 1, 1, 9));
  });
  

  // Valid puzzle strings pass the solver
  test('Valid puzzle strings pass the solver', function() {
    const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isString(solver.solve(input));
  });
  
  // Invalid puzzle strings fail the solver
  test('Invalid puzzle strings fail the solver', function() {
    const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37x';
    assert.isFalse(solver.solve(input));
  });
  
  // Solver returns the expected solution for an incomplete puzzle
  test('Solver returns the expected solution for an incomplete puzzle', function() {
    const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(input), solution);
  });

});
