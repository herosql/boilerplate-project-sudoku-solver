'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      const coordinate =  req.body.coordinate;
      const value = req.body.value;

      if(!puzzle){
        res.json({'error':'Required field(s) missing'});
      }

      if(!coordinate){
        res.json({'error':'Required field(s) missing'});
      }
      if(!value){
        res.json({'error':'Required field(s) missing'});
      }

      if(puzzle.length != 81){
        res.json({error:'Expected puzzle to be 81 characters long'});
      }


      if(Number.isNaN(Number(value)) || Number(value) <= 0 || Number(value) > 9){
        res.json({'error':'Invalid value'});
      }

      const charPart = coordinate.substring(0,1);
      const numPart = coordinate.substring(1,coordinate.length);
      const alphabet = "ABCDEFGHI";
      if(alphabet.indexOf(charPart.toUpperCase()) === -1){
        res.json({error:'Invalid coordinate'});
      }
      const charIndex = alphabet.indexOf(charPart.toUpperCase()) + 1;
      const row = charIndex;
      if(Number(numPart) <= 0 || Number(numPart) > 9){
        res.json({error:'Invalid coordinate'});
      }
      const col = Number(numPart);
      let isValid = true;
      isValid = solver.validate(puzzle);
      let conflict = '';
      if(!isValid){
        res.json({error:'Invalid characters in puzzle'});
      }

      if(solver.getValueFromSudoku(puzzle,row,col) === value){
        res.json({valid:true,conflict:''});
      }

      isValid = solver.checkRowPlacement(puzzle,row,col,value);
      if(!isValid){
        conflict += 'row';
      }
      isValid = solver.checkColPlacement(puzzle,row,col,value);
      if(!isValid){
        conflict += 'column';
      }
      isValid = solver.checkRegionPlacement(puzzle,row,col,value);
      console.log(isValid);
      if(!isValid){
        conflict += 'region';
      }


      if(conflict.length !== 0){
        res.json({valid:false,conflict:conflict});
      }
      res.json({valid:true,conflict:''});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if(!puzzle){
        res.json({error:'Required field missing'});
      }

      if(puzzle.length != 81){
        res.json({error:'Expected puzzle to be 81 characters long'});
      }
      const solution = solver.solve(puzzle);
      if(!solution){
        res.json({error:'Invalid characters in puzzle'});
      }

      if(solution.indexOf('.') !== -1){
        res.json({error:'Puzzle cannot be solved'});

      }
      
      res.json({solution:solution});
    });
};