import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/users")
                    .then(res => {
                        //console.log(res.data)
                        setUsers(res.data.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [users])
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => <tr key={user._id}>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th></th>
                            <th></th>
                            <th>{user.isAdmin === true ? <p className='text-green-600'>Admin</p> : <p>User</p>}</th>
                            <th>
                                <button className="bg-error text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;