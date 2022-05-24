import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Auth/Firebase/firebase.init';
import Loading from "../Extra/Loading/Loading"
const Dashboard = () => {
    const [user, loading] = useAuthState(auth);
    const email = user.email;
    const [users, setUsers] = useState({});
    const admin = users[0]?.isAdmin;
    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`https://autima.herokuapp.com/api/v1/user/${email}`)
                .then(res => setUsers(res.data.data))
        }
        fetchUser();
    }, [email])

    if (loading) {
        return <Loading />
    }
    return (
        <div className='sticky'>
            <div className="w-full navbar bg-base-300">
                <div className="flex-1 px-2 mx-2 text-4xl">Dashboard</div>
            </div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className='mt-3 mr-2'>
                        <Outlet />
                    </div>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-64 bg-base-100 text-white">
                        <li className='bg-slate-900 mb-2 rounded-md'><Link to="/dashboard">My Profile</Link></li>
                        {
                            admin ?

                                <>
                                    <li className='bg-slate-900 rounded-md'>
                                        <Link to="/dashboard/product">All Product</Link>
                                    </li>
                                    <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/users">All Users</Link></li>
                                    <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/manageOrders">Manage Orders</Link></li>
                                </>
                                :
                                <>
                                    <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/orders">Orders</Link></li>
                                    <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/reviews">Reviews</Link></li>
                                </>

                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;