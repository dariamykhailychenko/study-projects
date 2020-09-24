import React, { useReducer, useState } from 'react';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import { addUserAddress } from '../../../store/registration/actions';
import { userStateSelector } from '../../../store/registration/selectors';
import { prevStep, nextStep, currentStep } from '../../../store/steps/actions';
import { useSelector, useDispatch } from 'react-redux';


const SecondStep = () => {
  const state = useSelector(userStateSelector);
  const dispatchAction = useDispatch()

  const [user, dispatchUser] = useReducer(reducer, state);

  const [errorCountry, setErrorCountry] = useState('');
  const [errorCity, setErrorCuty] = useState('');
  const [errorStreet, setErrorStreet] = useState('');
  const [errorNumber, setErrorNumber] = useState('');

  const handlePrev = () => {
    dispatchAction(addUserAddress(user.country, user.city, user.street, user.houseNumber));
    dispatchAction(prevStep());
}

  const handleNext = () => {
    dispatchAction(addUserAddress(user.country, user.city, user.street, user.houseNumber));
    if (validate()) {
      dispatchAction(nextStep());
    }
    dispatchAction(currentStep());
  }

  const validate = () => {
    let regexpAddress = /^[a-z]{2,16}$/;
    let regexpNumber = /^[a-z0-9]{2,16}$/;
    let result = true;
    setErrorCountry('');
    setErrorCuty('');
    setErrorStreet('');
    setErrorNumber('');

    if (!user.country || !user.country.match(regexpAddress)) {
      setErrorCountry("Country is not valid");
      result = false;
    }
    if (!user.city || !user.city.match(regexpAddress)) {
      setErrorCuty("City name is not valid");
      result = false;
    }
    if (!user.street || !user.street.match(regexpAddress)) {
      setErrorStreet("Street is not valid");
      result = false;
    }
    if (!user.houseNumber || !user.houseNumber.match(regexpNumber)) {
      setErrorNumber("Number is not valid");
      result = false;
    }
    return result;
  }

  function reducer(state, action) {
      switch (action.type) {
        case 'country':
          return updateCountry(state, action);
        case 'city':
          return updateCity(state, action);
        case 'street':
          return updateStreet(state, action);
        case 'houseNumber':
          return updateHouseNumber(state, action);  
        default:
          throw new Error();
      }
  }

  function updateCountry(state, action) {
    let country = action.payload;
    return {...state, country};
  }
  
  function updateCity(state, action) {
    let city = action.payload;  
    return {...state, city};
  } 
  
  function updateStreet(state, action) {
    let street = action.payload;  
    return {...state, street};
  }

  function updateHouseNumber(state, action) {
    let houseNumber = action.payload;  
    return {...state, houseNumber};
  }

  return (
    <form>
      <div className="step">
        <p>Address:</p>
        <Input id="country" type="text" error={errorCountry} placeholder="Country" onChange={(e) => dispatchUser({type: 'country', payload: e.target.value})} value={user.country}/>
        <Input id="city" type="text" error={errorCity} placeholder="City"  onChange={(e) => dispatchUser({type: 'city', payload: e.target.value})} value={user.city}/>
        <Input id="street" type="text" error={errorStreet} placeholder="Street" onChange={(e) => dispatchUser({type: 'street', payload: e.target.value})} value={user.street}/>
        <Input id="house" type="text" error={errorNumber} placeholder="House number" onChange={(e) => dispatchUser({type: 'houseNumber', payload: e.target.value})} value={user.houseNumber}/>
        <Button type="button" name={"Prev"}  onClick={() => handlePrev()} />
        <Button type="button" name={"Next"} onClick={() => handleNext()} />
      </div>
    </form>
  );
}

export default SecondStep;