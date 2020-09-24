import React, {useReducer} from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import { chooseImg } from '../../../store/registration/actions';
import { useSelector, useDispatch } from 'react-redux';
import { userStateSelector } from '../../../store/registration/selectors';
import { prevStep, nextStep } from '../../../store/steps/actions';
import './ThirdStep.css'

const ThirdStep = () => {
    const state = useSelector(userStateSelector);
    const dispatchAction = useDispatch()

    const [user, dispatchUser] = useReducer(reducer, state);

    const handlePrev = () => {
        console.log(user);
        console.log(state);
        dispatchAction(chooseImg(user.img))
        dispatchAction(prevStep())
    }
    
    const handleNext = () => {
        dispatchAction(chooseImg(user.img))
        dispatchAction(nextStep())
    }

    function reducer(state, action) {
        switch (action.type) {
          case 'img':
            return updateRadioButton(state, action); 
          default:
            throw new Error();
        }
    }

    function updateRadioButton(state, action) {
        let img = action.payload;
        return {...state, img};
    }

    return (
        <form>
            <div className="step">
                <p>Choose an avatar:</p>
                <Input id="photo1" name="photo" type="radio" onChange={(e) => dispatchUser({type: 'img', payload: e.target.value})} value="https://coloring.otk7.com/admin/uploads_n/uploads/1/5/3//52478.png"/>
                <div className="img-1">
                    <img src="https://coloring.otk7.com/admin/uploads_n/uploads/1/5/3//52478.png" alt="man"></img>
                </div>
                <Input id="photo2" name="photo" type="radio" onChange={(e) => dispatchUser({type: 'img', payload: e.target.value})} value="https://tvoiraskraski.ru/sites/default/files/devushka-s-tsvetami_1866.jpg"/>
                <div className="img-1">
                    <img src="https://tvoiraskraski.ru/sites/default/files/devushka-s-tsvetami_1866.jpg" alt="woman"></img>
                </div>
                <Button type="button" name={"Prev"}  onClick={() => handlePrev()} />
                <Button type="button" name={"Next"} onClick={() => handleNext()} />
            </div>
        </form>
    );
}

export default ThirdStep;