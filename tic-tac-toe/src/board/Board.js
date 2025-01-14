import React, { useEffect } from 'react';
import { useState } from 'react';

import { Square } from './square/Square';

import './board.css';

export function Board() {

    const [player, setPlayer] = useState('X');

    const [squares, setSquares] = useState(Array(9).fill(null));

    const changePlayer = () => {
        setPlayer(player === 'X' ? 'O' : 'X');
    }

    const onResetBoard = () => {
        setPlayer('X');
        setSquares(Array(9).fill(null));
        setGameStatus(0);
    }


    const [gameStatus, setGameStatus] = useState(0);

    const checkWinner = () => {

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
            let line = lines[i];
            if (squares[line[0]] !== null && squares[line[0]] === squares[line[1]] && squares[line[1]] === squares[line[2]]) {
                setGameStatus(1);
                return 1;
            }
        }

        if (squares.filter(no => no === null).length === 0) {
            setGameStatus(2);
            return 1;
        }
    }

    const squareClickHandler = (sqNo) => {
        if (squares[sqNo] === null) {
            squares[sqNo] = player;
            const _gameStatus = checkWinner();
            if (_gameStatus !== 1) changePlayer();
        }
    }

    return (
        <>
            <div className='controls'>
                <button onClick={onResetBoard}> Reset </button>
            </div>
            <div className='container'>
                <div className='board'>
                    {
                        [0, 1, 2].map((i) =>
                            <div key={i}>
                                {[0, 1, 2].map((_i) => {
                                    const sqNo = 3 * i + _i;
                                    return <Square
                                        key={sqNo}
                                        value={squares[sqNo]}
                                        onClickHandler={() => squareClickHandler(sqNo)}
                                        isDisabled={gameStatus !== 0}
                                        style={{
                                            backgroundColor: gameStatus === 1 ? 'lightgreen'
                                                : gameStatus === 2 ? 'rgb(241, 89, 89)'
                                                    : 'rgb(245, 242, 242)'
                                        }}
                                    />
                                }
                                )}
                            </div>)
                    }
                </div>
                <div className='stats'>
                    <h3>Current player: {player}</h3>
                    <h3>
                        {
                            gameStatus === 1 ? 'Player ' + player + ' won the game' : gameStatus === 2 ? 'GAME OVER' : null
                        }
                    </h3>
                </div>
            </div>

        </>
    )
}