import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import auth from '../Firebase/firebase.init';

const ForgetPassword = () => {
    const { register, handleSubmit } = useForm();
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(
        auth
    );
    const onSubmit = data => {
        const fetchData = async () => {
            const email = data.email;
            await sendPasswordResetEmail(email);
            toast.success("Email Sent", { id: "success" });
        }
        fetchData();
    }
    return (
        <div>
            <div className='w-1/5 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-4xl mb-10'>Login</h1>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" {...register("email", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div className="flex items-start mb-6">
                        <h2>Back To <Link to="/login" className='text-blue-500' type='submit'>Login?</Link></h2>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sent</button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;