import React, { useState, useEffect } from 'react';
import { fireDb } from '../../../firebase';
import { collection, getDocs, deleteDoc, doc,updateDoc,query,where } from 'firebase/firestore';
import { Link,Router } from 'react-router-dom';
import { toast } from 'react-toastify'
// import './AllWorker.css';
import MaterialTable from 'material-table';


const AllPendingWorker = (props) => {
    const [data, setData] = useState([]);

    const columns = [
        { title: 'Worker Name', field: 'workerName', align: "left", filterPlaceholder: 'Search' },
        { title: 'Type', field: 'domain', align: "left",filtering: false },
        { title: 'Field', field: 'workingField',filtering: false},
        { title: 'Area', field: 'area', align: "left", filterPlaceholder: 'Search' },

    ]

    //change table name
   //firebase db collections
   const workersCollectionRef = collection(fireDb, "WorkerProfile");

   useEffect(() => {
    const getData = async () => {
        // const workerData = await getDocs(workersCollectionRef);
        const q = query(collection(fireDb, "WorkerProfile"), where("status", "==",""));
        const workerData = await getDocs(q);
        setData(workerData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getData();
}, [])



 //delete function
//  const handleDelete = async (id) => {
//     const workerDoc = doc(fireDb, "WorkerProfile", id);
//     if (window.confirm("Are you sure that you wanted to delete that contact ?")) {
//         try {
//             await deleteDoc(workerDoc);
//             toast.success("contact deleted successfully");
//         } catch (err) {
//             toast.error(err);
//         }
//     }
// }

//approve
const handleApprove = async (id)=>{
const washingtonRef = doc(fireDb, "WorkerProfile", id);

await updateDoc(washingtonRef, {
  status: "true"
});

alert('worker approved');

}



    return (
        <div>
            <h6>Pending Workers</h6>
            <MaterialTable
                columns={columns}
                data={data}
                // editable={{
                //     onRowAdd: () => alert('hello world')
                // }}
                actions={[

                    // rowData =>({
                    //     icon: () => <Link to={`/workers/update-worker/${rowData.id}`}><i className="fas fa-pen" style={{color:'black',fontSize:'20px'}}></i></Link>,
                    //     tooltip:'Update',
                    //     onClick:(rowData),
                    // }),

                    rowData =>({
                        icon: 'check',
                        tooltip:'Approve',
                        onClick: () => handleApprove(rowData.id),
                    }),

                    rowData =>({
                        icon: () => <Link to={`/pendingworkers/view-pending-worker/${rowData.id}`}><i className="fas fa-eye" style={{color:'black',fontSize:'20px'}}></i></Link>,
                        tooltip:'View',
                        onClick:(rowData),
                    }),

                   
                ]}

                options={{
                    actionsColumnIndex: -1,
                    sorting: true,
                    filtering: true,
                    pageSizeOptions: [5, 10, 15, 20, 25, 50],
                    pageSize: 5,
                    paginationType: 'stepped',
                    showFirstLastPageButtons: false,
                    paginationPosition: 'both',
                    // exportButton:true,
                    // exportAllData:true,
                    // exportFileName:'contact data',



                }}
                title='Pending Workers Profile Data'
            />

        </div>
    )

}
export default AllPendingWorker;
