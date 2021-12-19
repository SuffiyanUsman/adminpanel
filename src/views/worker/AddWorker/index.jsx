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

const AddNewWorker = (props) => {
    const [state, setState] = useState(initialState);

    //destructure 
    const { workerName, domain, workingField, experience ,area, city , contact,address,shopaddress,openingTime,closingTime } = state;

    //firebase db collections
    const workersCollectionRef = collection(fireDb, "WorkerProfile");

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
        if (!workerName || !domain || !workingField || !experience || !area || !city || !contact || !address || !shopaddress || !openingTime || !closingTime ) {
            toast.error("Please provide value in each input field");
        }
        //add data in firebase firestore database
        else {
            try {
                await addDoc(workersCollectionRef, state);
                toast.success("worker added successfully")
                setTimeout(() => history.push('/workers/all-workers'), 500);
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

                    <label htmlFor="workerName">Worker Name</label>
                    <input
                        type="text"
                        id="workerName"
                        name="workerName"
                        placeholder="workerName.."
                        value={workerName}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="domain">Domain</label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        placeholder="Domain.."
                        value={domain}
                        onChange={handleInputChange}
                    />

                <label htmlFor="workingField">Working Field</label>
                    <input
                        type="text"
                        id="workingField"
                        name="workingField"
                        placeholder="workingField.."
                        value={workingField}
                        onChange={handleInputChange}
                    />

                <label htmlFor="experience">Experience</label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        placeholder="Experience.."
                        value={experience}
                        onChange={handleInputChange}
                    />


                    <label htmlFor="area">Area</label>
                    <input
                        type="text"
                        id="area"
                        name="area"
                        placeholder="Area.."
                        value={area}
                        onChange={handleInputChange}
                    />

                <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City.."
                        value={city}
                        onChange={handleInputChange}
                    />

                <label htmlFor="contact">Contact</label>
                    <input
                        type="number"
                        id="contact"
                        name="contact"
                        placeholder="Contact.."
                        value={contact}
                        onChange={handleInputChange}
                    />

                <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address.."
                        value={address}
                        onChange={handleInputChange}
                    />
                    
                <label htmlFor="shopaddress">Shop Address</label>
                    <input
                        type="text"
                        id="shopaddress"
                        name="shopaddress"
                        placeholder="ShopAddress.."
                        value={shopaddress}
                        onChange={handleInputChange}
                    />
                    
                <label htmlFor="openingTime">Opening Time</label>
                    <input
                        type="text"
                        id="openingTime"
                        name="openingTime"
                        placeholder="OpeningTime.."
                        value={openingTime}
                        onChange={handleInputChange}
                    />
                    
                <label htmlFor="closingTime">Closing Time</label>
                    <input
                        type="text"
                        id="closingTime"
                        name="closingTime"
                        placeholder="ClosingTime.."
                        value={closingTime}
                        onChange={handleInputChange}
                    />
                    
                   
                    <input type="submit" value="Save" />

                </form>

    )
}

export default AddNewWorker;
