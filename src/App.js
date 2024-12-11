import React, { useState } from "react";
import "./App.css";

const BOARD_SIZE = 20; // 20x20 棋盘
const SQUARE_SIZE = 25; // 每个小格子的尺寸

function App() {
  const [board, setBoard] = useState(Array(20).fill().map(() => Array(20).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("black");
  const [winCondition, setWinCondition] = useState(5); // 默认为5子棋规则
  const [winner, setWinner] = useState(null);

  // 检查胜利
  const checkWin = (player) => {
    const directions = [
      { dx: 1, dy: 0 }, // 水平方向
      { dx: 0, dy: 1 }, // 垂直方向
      { dx: 1, dy: 1 }, // 对角线（右下）
      { dx: 1, dy: -1 } // 对角线（右上）
    ];

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (board[x][y] !== player) continue;
        for (const { dx, dy } of directions) {
          let count = 0;
          for (let i = 0; i < winCondition; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx >= 0 && ny >= 0 && nx < BOARD_SIZE && ny < BOARD_SIZE && board[nx][ny] === player) {
              count++;
            } else {
              break;
            }
          }
          if (count === winCondition) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleClick = (x, y) => {
    if (board[x][y] || winner) return;

    const newBoard = board.map(row => [...row]);
    newBoard[x][y] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(currentPlayer)) {
      setWinner(currentPlayer);
      alert(`${currentPlayer} wins!`);
    } else {
      setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    }
  };

  const handleRestart = () => {
    setBoard(Array(20).fill().map(() => Array(20).fill(null)));
    setCurrentPlayer("black");
    setWinner(null);
  };

  const handleChangeWinCondition = (num) => {
    setWinCondition(num);
    handleRestart();
  };

  return (
    <div className="container">
      <h1>五子棋变体游戏</h1>
      <div>
        <span>选择目标棋子数量：</span>
        <button className="restart" onClick={() => handleChangeWinCondition(5)}>5子棋</button>
        <button className="restart" onClick={() => handleChangeWinCondition(6)}>6子棋</button>
        <button className="restart" onClick={() => handleChangeWinCondition(7)}>7子棋</button>
      </div>
      <div className="board">
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              className={`cell ${cell}`}
              style={{
                left: y * SQUARE_SIZE + "px",
                top: x * SQUARE_SIZE + "px",
              }}
              onClick={() => handleClick(x, y)}
            />
          ))
        )}
      </div>
      <button className="restart" onClick={handleRestart}>重新开始</button>
    </div>
  );
}

export default App;
