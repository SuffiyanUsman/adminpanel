import React,{useState,useEffect} from 'react';
import { fireDb } from '../../../firebase';
import {collection,getDoc,doc} from 'firebase/firestore';
import { useParams,useHistory,Link} from 'react-router-dom';
import './view.css';
import { toast } from 'react-toastify';

const View = () => {
    const [user,setUser] = useState([]);

    const {id} = useParams();

    const history = useHistory();


    
    useEffect(()=>{
        const getData = async () =>{
            const userData = await getDoc(doc(fireDb, "users", id)).then(docSnap => {
                if (docSnap.exists()) {
                  setUser(docSnap.data());
                } else {
                  toast.error("no data found");
                }
              })     
        }
       getData();
    },[id])

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <p>User Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>First Name :</strong>
                    <span>{user.firstName}</span>
                    <br />
                    <br />

                    <strong>Last Name :</strong>
                    <span>{user.lastName}</span>
                    <br />
                    <br />
                
                    <strong>Email :</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    
                    <strong>Password :</strong>
                    <span>{user.password}</span>
                    <br />
                    <br />
                    
                    
                                          <button className="btn btn-edit backBtn" onClick={()=>history.goBack()}>Go Back</button>
                </div>
            </div>

        </div>
    )
}

export default View
