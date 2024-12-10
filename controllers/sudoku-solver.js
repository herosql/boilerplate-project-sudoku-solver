class SudokuSolver {

  validate(puzzleString) {
    let isValid = true;
    // check length
    if(puzzleString.length !== 81){
      isValid = false;
    }
    // check char
    for (let i = 0; i < puzzleString.length; i++) {
        const char = puzzleString.charAt(i);
        if (!((char >= '1' && char <= '9') || char === '.')) {
          isValid = false; 
          break;
      }
    }
    return isValid;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // 将一行切分为一个字符串，rowBegin为开头,rowEnd为结尾
    // 换算方式是，rowBegin = row * 9，rowEnd = (row+1) * 9
    // 枚举校验， 第一行为 0,9，根据截取方式为取左不取右，0,8,九个字符
    const rowStr = puzzleString.substring((row-1)  * 9,((row-1)  + 1 ) * 9);
    let isValid = true;
    Array.from(rowStr).forEach(rowValue =>{
      if(rowValue === (value + "")){
        isValid = false;
        return isValid;
      }
    });
    return isValid;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // 将字符串转换为二维数组，获取二维数组中的列，将值进行校验。
    // 每一列的下标为，上一列的坐标 + 9 ，循环九遍
    let columIndex = column - 1;
    let isValid = true;
    for(let x = 0;x < 9;x++){
      if(puzzleString.charAt(columIndex) === (value + "")){
        isValid = false;
      }
      columIndex = columIndex + 9;
    }
    return isValid;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // 确定所在小九宫格的左上角坐标（行和列）
    let boxRowStart = Math.floor(row / 3) * 3;
    let boxColStart = Math.floor(column / 3) * 3;
    let isValid = true;
    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
        for (let c = boxColStart; c < boxColStart + 3; c++) {
            let index = r * 9 + c;
            if(puzzleString[index] === '.'){
              continue;
            }
            let num = parseInt(puzzleString[index]);
            if(num === Number(value)){
              isValid = false;
              return isValid;
            }
        }
    }
    return isValid;
  }

  getValueFromSudoku(puzzleString, row, col) {
    const adjustedRow = row - 1;
    const adjustedCol = col - 1;
    const index = adjustedRow * 9 + adjustedCol;
    return puzzleString[index];
  }

  solve(puzzleString) {
    if(!this.validate(puzzleString)){
      return false;
    }

    /*
    // check row
    for(let row = 1;row<10;row++){
      const rowStr = puzzleString.substring((row -1) * 9,((row -1) + 1 ) * 9);
      let set = new Set(Array.from(rowStr));
      if(set.size < rowStr.length){
        return false;
      }
    }

    // check col
    for(let columIndex = 0;columIndex < 9;columIndex ++){
      let colArray = []; 
      for(let x = 0;x < 9;x++){
        columIndex = columIndex + 9;
        colArray.push(puzzleString.charAt(columIndex));
      }
      let set = new Set(colArray);
      if(set.size < colArray.length){
        return false;
      }
    }

    // check region placement
    for(let boxRowStart = 0;boxRowStart < 9;boxRowStart +=3){
      for(let boxColStart = 0;boxColStart < 9;boxColStart +=3){
        let regionPlacementArray = []; 
        for (let r = boxRowStart; r < boxRowStart + 3; r++) {
          for (let c = boxColStart; c < boxColStart + 3; c++) {
              let index = r * 9 + c;
              let num = parseInt(puzzleString[index]);
              regionPlacementArray.push(num);
          }
        }
        let set = new Set(regionPlacementArray);
        if(set.size < regionPlacementArray.length){
          return false;
        }
      }
    }
      */

    return this.solveSudoku(puzzleString);

  }

  solveSudoku(sudokuString) {
    const board = [];
    for (let i = 0; i < 9; i++) {
        const rowStr = sudokuString.slice(i * 9, (i + 1) * 9);
        const row = [];
        for (let j = 0; j < 9; j++) {
            const num = rowStr[j] === '.'? 0 : parseInt(rowStr[j]);
            row.push(num);
        }
        board.push(row);
    }

    function is_valid(row, col, num) {
        // 检查行
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }

        // 检查列
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // 检查小九宫格
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function backtrack() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (is_valid(row, col, num)) {
                            board[row][col] = num;
                            if (backtrack()) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    if (backtrack()) {
        let result = '';
        for (let i = 0; i < 9; i++) {
            result += board[i].map(num => num === 0? '.' : num).join('');
        }
        return result;
    }

    return sudokuString;
}

}

module.exports = SudokuSolver;

