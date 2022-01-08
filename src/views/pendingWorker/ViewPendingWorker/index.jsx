import React,{useState,useEffect} from 'react';
import { fireDb } from '../../../firebase';
import {collection,getDoc,doc} from 'firebase/firestore';
import { useParams,useHistory,Link} from 'react-router-dom';
import './view.css';
import { toast } from 'react-toastify';

const View = () => {
    const [workerProfile,setWorkerProfile] = useState([]);

    const {id} = useParams();

    const history = useHistory();


    
    useEffect(()=>{
        const getData = async () =>{
            const workerData = await getDoc(doc(fireDb, "WorkerProfile", id)).then(docSnap => {
                if (docSnap.exists()) {
                  setWorkerProfile(docSnap.data());
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
                    <p>WorkerProfile Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />

                    <strong>WorkerName:</strong>
                    <span>{workerProfile.workerName}</span>
                    <br />
                    <br />

                    <strong>Domain:</strong>
                    <span>{workerProfile.domain}</span>
                    <br />
                    <br />
                
                <strong>WorkingField:</strong>
                    <span>{workerProfile.workingField}</span>
                    <br />
                    <br />
                    
                    <strong>Experience:</strong>
                    <span>{workerProfile.experience}</span>
                    <br />
                    <br />
                    
                    <strong>Area:</strong>
                    <span>{workerProfile.area}</span>
                    <br />
                    <br />
                    
                    <strong>City:</strong>
                    <span>{workerProfile.city}</span>
                    <br />
                    <br />

                    <strong>Contact:</strong>
                    <span>{workerProfile.contact}</span>
                    <br />
                    <br />

                    <strong>Address:</strong>
                    <span>{workerProfile.address}</span>
                    <br />
                    <br />

                    <strong>Shop Address (Optional):</strong>
                    <span>{workerProfile.shopaddress}</span>
                    <br />
                    <br />

                    <strong>Opening Time:</strong>
                    <span>{workerProfile.openingTime}</span>
                    <br />
                    <br />

                    <strong>Closing Time:</strong>
                    <span>{workerProfile.closingTime}</span>
                    <br />
                    <br />


                                          <button className="btn btn-edit backBtn" onClick={()=>history.goBack()}>Go Back</button>
                </div>
            </div>

        </div>
    )
}

export default View
