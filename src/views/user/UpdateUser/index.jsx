import React, { useState, useEffect } from 'react';
import {useHistory,useParams} from 'react-router-dom';
import { fireDb } from '../../../firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify';
import './update.css'

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password:""
}

const UpdateUser = (props) => {
    const [state, setState] = useState(initialState);

    //destructure 
    const { firstName, lastName, email,password  } = state;

    //firebase db collections
    const usersCollectionRef = collection(fireDb, "users");

    //hsitory reference
    const history = useHistory();

    //id
    const { id } = useParams();

    useEffect(()=>{
        const getData = async()=>{
        const docRef = doc(fireDb, "users", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            toast.error('no data found');
        } else {
            setState(docSnap.data());
        }
    }
        getData();
    },[id])

    
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
                    const singleUser = doc(fireDb, "users", id);
                    await updateDoc(singleUser, state);
                    toast.success("city updated successfully")
                    setTimeout(() => history.push('/users/all-users'), 500);
                } 
                catch (err) {
                    toast.error(err);
                }
        }
    };



    return (
        <div>

                <form
                    style={{
                        margin: 'auto',
                        maxWidth: '400px',
                        padding: '15px',
                        alignContent: 'center'

                    }}
                    autoComplete="off"

                    onSubmit={handleSubmit}
                >

                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name.."
                        value={firstName || state.firstName}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name.."
                        value={lastName || state.lastName}
                        onChange={handleInputChange}
                    />

                <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email.."
                        value={email || state.email}
                        onChange={handleInputChange}
                    />

                <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password.."
                        value={password || state.password}
                        onChange={handleInputChange}
                    />
                   
                    <input type="submit" value="Update" />

                </form>
            </div>

    )
}

export default UpdateUser;
