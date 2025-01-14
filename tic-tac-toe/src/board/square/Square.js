import React from 'react';

import './square.css';

export function Square({ value, onClickHandler, isDisabled, style }) {

    return (
        <button className='square' onClick={onClickHandler} disabled={isDisabled} style={style}>
            {value}
        </button>
    )
}