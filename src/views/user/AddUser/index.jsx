import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { fireDb } from '../../../firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './add.css'

const initialState = {
    workerName: "",
    domain: "",
    workingField: "",
    experience:"",
    area: "",
    city: "",
    contact:"",
    address:"",
    shopaddress:"",
    openingTime:"",
    closingTime:""
}

const AddNewUser = (props) => {
    const [state, setState] = useState(initialState);

    //destructure 
    const { firstName, lastName, email, password  } = state;

    //firebase db collections
    const usersCollectionRef = collection(fireDb, "users");

    //hsitory reference
    const history = useHistory();

    //getting input values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //check empty field
        if (!firstName || !lastName || !email || !password ) {
            toast.error("Please provide value in each input field");
        }
        //add data in firebase firestore database
        else {
            try {
                await addDoc(usersCollectionRef, state);
                toast.success("worker added successfully")
                setTimeout(() => history.push('/users/all-users'), 500);
            }
            catch (err) {
                toast.error(err)
            }


        }

    }


    return (
                <form
                    style={{
                        margin: 'auto',
                        maxWidth: '600px',
                        padding: '15px',
                        alignContent: 'center',

                    }}
                    autoComplete="off"

                    onSubmit={handleSubmit}
                >

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="FirstName.."
                        value={firstName}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="LastName.."
                        value={lastName}
                        onChange={handleInputChange}
                    />

                <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email.."
                        value={email}
                        onChange={handleInputChange}
                    />

                <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password.."
                        value={password}
                        onChange={handleInputChange}
                    />

                    
                   
                    <input type="submit" value="Save" />

                </form>

    )
}

export default AddNewUser;
