import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='sticky'>
            <div class="w-full navbar bg-base-300">
                <div class="flex-1 px-2 mx-2 text-4xl">Dashboard</div>
            </div>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    <div className='mt-3 mr-2'>
                        <Outlet />
                    </div>
                    <div class="flex-none lg:hidden">
                        <label for="my-drawer-3" class="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-3" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-64 bg-base-100 text-white">
                        <li className='bg-slate-900 rounded-md'>
                            <Link to="/dashboard">All Product</Link>
                        </li>
                        <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/users">All Users</Link></li>
                        <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/orders">Orders</Link></li>
                        <li className='bg-slate-900 mt-2 rounded-md'><Link to="/dashboard/users">My Profile</Link></li>
                        <li className='bg-slate-900 mt-2 rounded-md'><Link to="/">Reviews</Link></li>
                        <li className='bg-slate-900 mt-2 rounded-md'><Link to="">Others</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;