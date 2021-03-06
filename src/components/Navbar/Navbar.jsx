import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../../pages/Auth/Firebase/firebase.init';
import Loading from "../../pages/Extra/Loading/Loading"
const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out successfully', { id: 'logout' });
        }).catch((error) => {
            toast.error("not logout", { id: 'logout' });
        });
    }
    if (loading) {
        return <Loading />
    }
    const navItem = <>
        <li className='hover:bg-secondary hover:text-white rounded-lg'><Link to="/">Home</Link></li>
        <li className='hover:bg-secondary hover:text-white rounded-lg'><Link to="/showProduct">Product</Link></li>
        <li className='hover:bg-secondary hover:text-white rounded-lg'><Link to="/portfolio">My Portfolio</Link></li>
        <li className='hover:bg-secondary hover:text-white rounded-lg'><Link to="/dashboard">Dashboard</Link></li>
        <li className='hover:bg-secondary hover:text-white rounded-lg '><Link to="/blogs">Blogs</Link></li>
        <li className='hover:bg-secondary hover:text-white rounded-lg '><Link to="/contact">Contact us</Link></li>
        {
            user ? <li className='hover:bg-secondary hover:text-white rounded-lg '><button onClick={logout} >Logout</button></li> : <li className='hover:bg-secondary hover:text-white rounded-lg '><Link to="/login">Login</Link></li>
        }

    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-10">
            <div className='w-4/5 mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <p className="btn btn-ghost normal-case text-xl">
                        <Link to="/">Autima</Link>
                    </p>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {navItem}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;