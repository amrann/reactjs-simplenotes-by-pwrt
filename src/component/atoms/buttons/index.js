import React from 'react';

const Button = ({namaButton, onClick, loading}) => {
    if (loading === true){
        return <button className="btn disable">Loading...</button>
    }
    return (
        <button className="btn" onClick={onClick}>{namaButton}</button>
    )
}

export default Button;