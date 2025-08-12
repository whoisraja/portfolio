import React, { useMemo, useState } from 'react';
import './TicTacToe.css';

type PlayerMark = 'X' | 'O' | null;

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const calculateWinner = (squares: PlayerMark[]): PlayerMark => {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<PlayerMark[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(square => square !== null), [squares]);
  const isDraw = !winner && isBoardFull;

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const nextWinner = calculateWinner(nextSquares);
    if (nextWinner === 'X') {
      setScoreX(prev => prev + 1);
    } else if (nextWinner === 'O') {
      setScoreO(prev => prev + 1);
    }
  };

  const handleResetBoard = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleResetScores = () => {
    setScoreX(0);
    setScoreO(0);
    handleResetBoard();
  };

  const statusMessage = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="ttt-container">
      <div className="ttt-header">
        <h3>Tic‑Tac‑Toe</h3>
        <div className="ttt-scoreboard">
          <div className="ttt-score"><span>Player X</span><strong>{scoreX}</strong></div>
          <div className="ttt-score"><span>Player O</span><strong>{scoreO}</strong></div>
        </div>
      </div>

      <div className="ttt-status">{statusMessage}</div>

      <div className="ttt-board">
        {squares.map((value, index) => (
          <button
            key={index}
            className={`ttt-square ${value ? 'filled' : ''}`}
            onClick={() => handleSquareClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="ttt-actions">
        <button className="xp-button" onClick={handleResetBoard}>New Round</button>
        <button className="xp-button" onClick={handleResetScores}>Reset Scores</button>
      </div>
    </div>
  );
};

export default TicTacToe;


