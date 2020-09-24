import React from 'react';

const Input = (props) => {
    
    const getErrorBlock = () => {
        if (props.error) {
            return <span style={{color:'red'}}>{props.error}</span>;
        }
        return '';
    }

    return (
        <>
            <input 
                id={props.id} 
                type={props.type}
                name={props.name} 
                placeholder={props.placeholder} 
                onChange={props.onChange}
                value={props.value}
                checked={props.checked}
            />
            {getErrorBlock({props})}
        </>
    );
};

export default Input;