import React from 'react';
import { useSelector } from 'react-redux';
import { userStateSelector } from '../../../store/registration/selectors';
import './LastStep.css';

const LastStep = () => {
    const user = useSelector(userStateSelector);

    const createAddressLine = () => {
        let country = user.country;
        let city = user.city;
        let street = user.street;
        let houseNumber = user.houseNumber;
        return [country, city, street, houseNumber].filter(Boolean).join(", ");
    }

    return (
        <div className="lastStep">
            <h2>Thank you for registering</h2>
            <div>
                <img src={user.img} alt="img"/>
            </div>
            <p>Name: {user.name}</p>
            <p>Last name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Addres: {createAddressLine()}</p>
        </div>
    );
}

export default LastStep;