import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/users", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        setUsers(res.data.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [users])

    const handleAdmin = async (id) => {
        try {
            await axios.put(`https://autima.herokuapp.com/api/v1/user/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }, {
                isAdmin: true
            })
                .then(res => {
                    toast.success("User is now an admin", { id: "admin" })
                })
        } catch (err) {
            console.log(err);
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://autima.herokuapp.com/api/v1/user/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    toast.success("User is now deleted", { id: "delete" })
                })
        } catch (err) {
            console.log(err);
        }
    }
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
                            <th>{user.address}</th>
                            <th>{user.phone}</th>
                            <th>{user.isAdmin === true ? <p className='text-green-600'>Admin</p> : <p>User</p>}</th>
                            <th>
                                <button onClick={() => handleDelete(user?._id)} className="bg-error text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                                {
                                    user?.isAdmin === false ?
                                        <button onClick={() => handleAdmin(user?._id)} className="bg-secondary text-white font-bold py-2 px-4 rounded ml-2">
                                            Make Admin
                                        </button>
                                        :
                                        ""
                                }
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;