import React from 'react';

const Button = (props) => {

    return (
        <>
        <button id={props.id} type={props.type} onClick={props.onClick}>{props.name}</button>
        </>
    );
};

export default Button;