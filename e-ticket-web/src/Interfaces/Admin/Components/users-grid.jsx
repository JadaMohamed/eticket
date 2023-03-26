import React, { useState, useEffect  } from "react";
import axios from "axios";
import GridPagination from "./grid-pagination";

const UsersGrid = () => {
 const [users, setUsers]=useState([]);
 const [loading, setLoading]=useState(false);
 const [currentPage, setCurrenPage]=useState(1);
 const [userPerPage, setUserPerPage]=useState(5);

 useEffect(()=>{
    const fetchUsers= async ()=>{
        setLoading(true);
        const res =await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(res.data);
        setLoading(false);
    }
    fetchUsers();
 }, []);

 const indexOfLastUser= currentPage * userPerPage;
 const indexOfFirstUser= indexOfLastUser- userPerPage;
 const currentUsers= users.slice(indexOfFirstUser, indexOfLastUser);

 const paginate=(number)=> setCurrenPage(number);
 console.log(users);
 if(loading){
    return <p>loading...</p>
 }
  return (
    <div className="users-grid">
     <div className="users-grid-container">
        <table>
            <tr><th>A</th><th>ID</th><th>Name</th><th>Email</th><th>Joined</th><th>Type</th><th>Last activity</th><th>Actions</th></tr>
            {currentUsers.map((user)=><tr><td className="avatar"><span></span></td><td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>Jan 13, 2023</td><td>Client</td><td>Yesterday 13:35</td><td>...</td></tr>)}
        </table>
        <GridPagination userPerPage={userPerPage} totalUsers={users.length} paginate={paginate} setUserPerPage={setUserPerPage} currentPage={currentPage}/>
     </div>
    </div>
  );
};

export default UsersGrid;
