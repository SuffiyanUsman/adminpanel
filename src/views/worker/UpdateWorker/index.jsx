import React, { useState, useEffect } from 'react';
import {useHistory,useParams} from 'react-router-dom';
import { fireDb } from '../../../firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify';
import './update.css'

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

const UpdateWorker = (props) => {
    const [state, setState] = useState(initialState);

    //destructure 
    const { workerName, domain, workingField, experience ,area, city , contact,address,shopaddress,openingTime,closingTime } = state;

    //firebase db collections
    const workersCollectionRef = collection(fireDb, "WorkerProfile");

    //hsitory reference
    const history = useHistory();

    //id
    const { id } = useParams();

    useEffect(()=>{
        const getData = async()=>{
        const docRef = doc(fireDb, "WorkerProfile", id);
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
        if (!workerName || !domain || !workingField || !experience || !area || !city || !contact || !address || !shopaddress || !openingTime || !closingTime) {
            toast.error("Please provide value in each input field");
        }
        //add data in firebase firestore database
        else {
                try {
                    const singleWorker = doc(fireDb, "WorkerProfile", id);
                    await updateDoc(singleWorker, state);
                    toast.success("contact updated successfully")
                    setTimeout(() => history.push('/workers/all-workers'), 500);
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

                    <label htmlFor="workerName">Worker Name</label>
                    <input
                        type="text"
                        id="workerName"
                        name="workerName"
                        placeholder="workerName.."
                        value={workerName || state.workerName}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="domain">Domain</label>
                    <input
                        type="text"
                        id="domain"
                        name="domain"
                        placeholder="Domain.."
                        value={domain || state.domain}
                        onChange={handleInputChange}
                    />

                <label htmlFor="workingField">Working Field</label>
                    <input
                        type="text"
                        id="workingField"
                        name="descripworkingFieldtion"
                        placeholder="Working Field.."
                        value={workingField || state.workingField}
                        onChange={handleInputChange}
                    />


                    <label htmlFor="experience">Experience</label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        placeholder="Experience.."
                        value={experience || state.experience}
                        onChange={handleInputChange}
                    />
                      <label htmlFor="area">Area</label>
                    <input
                        type="text"
                        id="area"
                        name="area"
                        placeholder="Area.."
                        value={area || state.area}
                        onChange={handleInputChange}
                    />
                   
                    <input type="submit" value="Update" />

                </form>
            </div>

    )
}

export default UpdateWorker;
