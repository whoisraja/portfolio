import React, { useMemo, useState } from 'react';

type PlayerMark = 'X' | 'O';
type CellValue = PlayerMark | null;

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(board: CellValue[]): PlayerMark | null {
  for (const [a, b, c] of winningLines) {
    const cellA = board[a];
    if (cellA && cellA === board[b] && cellA === board[c]) {
      return cellA;
    }
  }
  return null;
}

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const currentPlayer: PlayerMark = isXNext ? 'X' : 'O';

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;
    const updatedBoard = board.slice();
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    setIsXNext((prev) => !prev);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const statusText = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? 'Draw!'
    : `Turn: ${currentPlayer}`;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12
  };

  const boardStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 80px)',
    gridTemplateRows: 'repeat(3, 80px)',
    gap: 6,
    background: '#ACA899',
    padding: 6,
    borderRadius: 6
  };

  const cellStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 700 as React.CSSProperties['fontWeight'],
    background: '#ECE9D8',
    border: '1px solid #ACA899',
    borderRadius: 4,
    cursor: winner ? 'default' : 'pointer',
    userSelect: 'none'
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontWeight: 700 }}>{statusText}</div>
      <div style={boardStyle}>
        {board.map((value, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            style={cellStyle}
            className="xp-button"
          >
            {value}
          </button>
        ))}
      </div>
      <button onClick={handleReset} className="xp-button">Reset</button>
    </div>
  );
};

export default TicTacToe;


