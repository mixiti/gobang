import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  const rows = [];
  for (let i = 0; i < 15; i++) {
    const row = [];
    for (let j = 0; j < 15; j++) {
      row.push(renderSquare(i * 15 + j));
    }
    rows.push(
      <div className="board-row" key={i}>
        {row}
      </div>
    );
  }

  return <div>{rows}</div>;
};

export default Board;
