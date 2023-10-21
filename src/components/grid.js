import React, { useState, useEffect } from 'react';
import './grid.css';
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import bg from "../assets/bg.jpg"

function Grid() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isCircleTurn, setIsCircleTurn] = useState(Math.random() < 0.5);
  const [winner, setWinner] = useState(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  useEffect(() => {
    if (!isCircleTurn && !winner && !isComputerThinking) {
      setIsComputerThinking(true);
      setTimeout(() => {
        const bestMove = findBestMove(boxes, 'circle', 'cross');
        makeMove(bestMove.index, 'circle');
        setIsComputerThinking(false);
      }, 500);
    }
  }, [isCircleTurn, winner, boxes, isComputerThinking]);

  const handleTurn = ()=>{
    if (isComputerThinking) {
      return <div>Turn: Computer</div>
    } else{
      return <div>Turn: Player</div>
    }
  }

  const makeMove = (index, symbol) => {
    if (!boxes[index] && !winner) {
      const newBoxes = [...boxes];
      newBoxes[index] = symbol;
      setBoxes(newBoxes);
      setIsCircleTurn(!isCircleTurn);

      // Check for a win after each move
      const gameWinner = calculateWinner(newBoxes);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (!newBoxes.includes(null)) {
        // Check for a draw
        setWinner('draw');
      }
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  function findBestMove(board, player, opponent) {
    let bestMove = null;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = player;

        const score = minimax(board, 0, false, player, opponent);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return { index: bestMove, score: bestScore };
  }

  function minimax(board, depth, isMaximizing, player, opponent) {
    const result = calculateWinner(board);

    if (result === player) {
      return 10 - depth;
    } else if (result === opponent) {
      return depth - 10;
    } else if (!board.includes(null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = player;
          const score = minimax(board, depth + 1, false, player, opponent);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = opponent;
          const score = minimax(board, depth + 1, true, player, opponent);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  const renderBox = (index) => {
    const boxState = boxes[index];
    if (boxState === 'circle') {
      return (
        <div className='box' id={`box-${index + 1}`}>
          <img src={circle} className='circle' alt='circle' />
        </div>
      );
    } else if (boxState === 'cross') {
      return (
        <div className='box' id={`box-${index + 1}`}>
          <img src={cross} className='circle' alt='cross' />
        </div>
      );
    } else {
      return (
        <div onClick={() => makeMove(index, 'cross')} className="box" id={`box-${index + 1}`}></div>
      );
    }
  };

  const renderResult = () => {
    if (winner === 'draw') {
      return <div className='result'>It's a draw!</div>;
    } else if (winner) {
      return <div className='result'>{winner === 'cross' ? 'You' : 'Computer'} wins!</div>;
    }
    return null;
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(null));
    setIsCircleTurn(true);
    setWinner(null);
  };


  const Modal = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
}

  return (
    <div>
    <div className='game'>
              <div>
      <img src={bg} className='bg'></img>
      </div>
        <div className='top-txts'>
        <h1>Tic Tac Toe</h1>
            <p>(Vs Computer)</p>
        </div>

        <div>
        <button className='turn'>
          {handleTurn()}
        </button>
        </div>

      <div className="grid">
        {Array(9).fill(null).map((_, index) => (
          <div key={index} className='box-container'>
            {renderBox(index)}
          </div>
        ))}
      </div>
      
      <div className='results'>
      {renderResult()}
      </div>
      <div>
        <button className='btn' onClick={resetGame}>New Game</button>
      </div>
      <div className='footer'>
        <h1>Made with ❤️ by <a href='#'>Yasiru Lakintha</a></h1>
      </div>
    </div>
    </div>
  );
}

export default Grid;
