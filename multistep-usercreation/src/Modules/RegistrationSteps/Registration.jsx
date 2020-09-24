import React  from 'react';
import { useSelector } from 'react-redux';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FoursStep from './FoursStep';
import LastStep from './LastStep';
import {getStep} from '../../store/steps/selectors';

const Registration = () => {

    const step = useSelector(getStep);

    const actions = [
      <FirstStep/>,
      <SecondStep/>,
      <ThirdStep/>,
      <FoursStep/>,
      <LastStep/>
    ];

    return (
        <div className="wrapper">
          {actions[step]}
        </div>
      );
}

export default Registration;