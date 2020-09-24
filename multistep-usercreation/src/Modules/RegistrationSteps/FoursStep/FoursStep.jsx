import React, { useReducer, useState } from 'react';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import { addPassword } from '../../../store/registration/actions';
import { useSelector, useDispatch } from 'react-redux';
import { userStateSelector } from '../../../store/registration/selectors';
import { prevStep, nextStep } from '../../../store/steps/actions';

const FoursStep = () => {
    const state = useSelector(userStateSelector);
    const dispatchAction = useDispatch()

    const [user, dispatchUser] = useReducer(reducer, state);

    const [errorPassword, setErrorPassword] = useState('');

    const handlePrev = () => {
        dispatchAction(addPassword(user.password, user.repeatPassword));
        dispatchAction(prevStep());
    }

    function submitRegistration() {
        let isValid = user.password && user.repeatPassword && user.password === user.repeatPassword;

        if (isValid && validate()) {
            dispatchAction(addPassword(user.password, user.repeatPassword));
            dispatchAction(nextStep());
        }else if (!isValid) {
            alert('Password is incorrect');
        }
    }

    const validate = () => {
        let regexpPassword = /^[a-z0-9]{8,16}$/;
        let result = true;
        setErrorPassword('');
    
        if (!user.password || !user.password.match(regexpPassword)) {
          setErrorPassword("Password is not valid");
          result = false;
        }
        return result;
      }
    
    function reducer(state, action) {
        switch (action.type) {
          case 'password':
            return updatePassword(state, action);
          case 'repeatPassword':
            return updateRepeatPassword(state, action);  
          default:
            throw new Error();
        }
    }

    function updatePassword(state, action) {
        let password = action.payload;
        return {...state, password};
    }

    function updateRepeatPassword(state, action) {
        let repeatPassword = action.payload;
        return {...state, repeatPassword};
    }
     
    return (
        <form>
            <div className="step">
                <label for="psw1">Enter password:</label>
                <Input id="psw1" type="password" error={errorPassword} onChange={(e) => dispatchUser({type: 'password', payload: e.target.value})} value={user.password}/>
                <label for="psw2">Confirm your password:</label>
                <Input id="psw2" type="password" onChange={(e) => dispatchUser({type: 'repeatPassword', payload: e.target.value})} value={user.repeatPassword}/>
                <Button type="button" name={"Prev"}  onClick={() => handlePrev()} />
                <Button type="button" name="Submit" onClick={() => submitRegistration()} />
            </div>
        </form>
    );
}

export default FoursStep;