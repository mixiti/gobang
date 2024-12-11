export const checkWinner = (squares) => {
    const size = 15;
    const winningCount = 5;
  
    const checkLine = (line) => {
      for (let i = 0; i <= line.length - winningCount; i++) {
        const slice = line.slice(i, i + winningCount);
        if (slice.every(cell => cell === 'X' || cell === 'O')) {
          return true;
        }
      }
      return false;
    };
  
    // 检测水平线
    for (let i = 0; i < size; i++) {
      if (checkLine(squares.slice(i * size, i * size + size))) {
        return true;
      }
    }
  
    // 检测垂直线
    for (let i = 0; i < size; i++) {
      const verticalLine = [];
      for (let j = 0; j < size; j++) {
        verticalLine.push(squares[j * size + i]);
      }
      if (checkLine(verticalLine)) {
        return true;
      }
    }
  
    return false;
  };
  