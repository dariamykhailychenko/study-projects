import React, { useReducer, useState } from 'react';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addUserEssentialData } from '../../../store/registration/actions';
import { userStateSelector } from '../../../store/registration/selectors';
import { nextStep, currentStep } from '../../../store/steps/actions';
import './FirstStep.css';


const FirstStep = () => {
  const state = useSelector(userStateSelector);
  const dispatchAction = useDispatch()

  const [user, dispatchUser] = useReducer(reducer, state);

  const [errorName, setErrorName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');


  const handleNext = () => {
    dispatchAction(addUserEssentialData(user.name, user.lastName, user.email));
    if (validate()) {
      dispatchAction(nextStep());
    }
    dispatchAction(currentStep());
  }

  const validate = () => {
    let regexpName = /^[a-z]{2,16}$/;
    let regexpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    let result = true;
    setErrorName('');
    setErrorLastName('');
    setErrorEmail('');

    if (!user.name || !user.name.match(regexpName)) {
      setErrorName("First name is not valid");
      result = false;
    }
    if (!user.lastName || !user.lastName.match(regexpName)) {
      setErrorLastName("Last name is not valid");
      result = false;
    }
    if (!user.email || !user.email.match(regexpEmail)) {
      setErrorEmail("Email is not valid");
      result = false;
    }
    return result;
  }

  function reducer(state, action) {
      switch (action.type) {
        case 'name':
          return updateUserName(state, action);
        case 'lastName':
          return updateUserLastName(state, action);
        case 'email':
          return updateUserEmail(state, action);  
        default:
          throw new Error();
      }
    }

  function updateUserName(state, action) {
      let name = action.payload;
      return {...state, name};
  }
  
  function updateUserLastName(state, action) {
      let lastName = action.payload;
      return {...state, lastName};
  } 
  
  function updateUserEmail(state, action) {
      let email = action.payload;  
      return {...state, email};
  }

    return (
      <form>
        <div className="step">
          <p>Registration:</p>
          <Input id="name" type="text" error={errorName} placeholder="First name" onChange={(e) => dispatchUser({type: 'name', payload: e.target.value})} value={user.name}/>
          <Input id="last-name" type="text" error={errorLastName} placeholder="Second name" onChange={(e) => dispatchUser({type: 'lastName', payload: e.target.value})} value={user.lastName}/>
          <Input id="email" type="text" error={errorEmail} placeholder="Email" onChange={(e) => dispatchUser({type: 'email', payload: e.target.value})} value={user.email}/>
          <Button type="button" name={"Next"} onClick={() => handleNext()}/>
        </div>
      </form>
    );
}

export default FirstStep;