import React, { useState, useEffect } from 'react';
import { fireDb } from '../../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link,Router } from 'react-router-dom';
import { toast } from 'react-toastify'
import './all.css';
import MaterialTable from 'material-table';


const AllUser = (props) => {
    const [data, setData] = useState([]);

    const columns = [
        { title: 'First Name', field: 'firstName', align: "left", filter: 'Search' },
        { title: 'Last Name', field: 'lastName', align: "left",filtering: false },
        { title: 'Email', field: 'email',filterPlaceholder: 'Search'},
        // { title: 'Password', field: 'password', align: "left", filtering: false },

    ]

    //change table name
   //firebase db collections
   const usersCollectionRef = collection(fireDb, "users");

   useEffect(() => {
    const getData = async () => {
        const userData = await getDocs(usersCollectionRef);
        setData(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getData();
}, [])



 //delete function
 const handleDelete = async (id) => {
    const userDoc = doc(fireDb, "users", id);
    if (window.confirm("Are you sure that you wanted to delete that contact ?")) {
        try {
            await deleteDoc(userDoc);
            toast.success("contact deleted successfully");
        } catch (err) {
            toast.error(err);
        }
    }
}




    return (
        <div>
            <h6>All Users</h6>
            <MaterialTable
                columns={columns}
                data={data}
                // editable={{
                //     onRowAdd: () => alert('hello world')
                // }}
                actions={[

                    rowData =>({
                        icon: () => <Link to={`/users/update-user/${rowData.id}`}><i className="fas fa-pen" style={{color:'black',fontSize:'20px'}}></i></Link>,
                        tooltip:'Update',
                        onClick:(rowData),
                    }),

                    rowData =>({
                        icon: 'delete',
                        tooltip:'Delete',
                        onClick: () => handleDelete(rowData.id),
                    }),

                    rowData =>({
                        icon: () => <Link to={`/users/view-user/${rowData.id}`}><i className="fas fa-eye" style={{color:'black',fontSize:'20px'}}></i></Link>,
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
                title='Users Detail'
            />

        </div>
    )

}
export default AllUser;
