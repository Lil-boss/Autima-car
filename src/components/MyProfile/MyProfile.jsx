import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../pages/Auth/Firebase/firebase.init';
import Loading from '../../pages/Extra/Loading/Loading';

const MyProfile = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const email = user.email;
    const [users, setUsers] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/user/${email}`)
                    .then(res => setUsers(res.data.data))
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [email])

    const handleUpdate = async (id) => {
        navigate(`/dashboard/updateUser/${id}`)
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div className='flex justify-center items-center mt-10'>
            <div className="card max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className='text-2xl'>User Name:{users[0]?.name}</h2>
                    <p className='text-2xl'>Email:{users[0]?.email}</p>
                    <p className='text-2xl'>Education:{users[0]?.education}</p>
                    <p className='text-2xl'>Address:{users[0]?.address}</p>
                    <p className='text-2xl'>Phone Number:{users[0]?.phone}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleUpdate(users[0]?._id)} className="btn btn-secondary text-white">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;