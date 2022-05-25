import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../pages/Auth/Firebase/firebase.init';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateUser = () => {
    const { id } = useParams()
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null);
    const { register, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    const { displayName, email } = user;
    const onSubmit = async (data) => {
        const fetchUser = async () => {
            const { name, email, education, address, phone } = data;
            const user = {
                name: name,
                email: email,
                education: education,
                address: address,
                phone: phone
            }
            try {
                await axios.put(`https://autima.herokuapp.com/api/v1/user/${id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }, user)
                    .then(res => toast.success("User Updated Successfully", { id: "success" }))
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            <p className='text-center text-2xl'>Purchase</p>
                                        </Dialog.Title>
                                        <div className='grid sm:grid-cols-1 justify-items-center md:grid-cols-2 gap-3 '>
                                            <div className='w-4/5 mx-auto'>
                                                <form onSubmit={handleSubmit(onSubmit)} className="ml-10">
                                                    <input type="text" defaultValue={displayName}  {...register("name", {
                                                        required: {
                                                            value: true,
                                                            message: "name is required"
                                                        }
                                                    })} placeholder="name" className="input input-bordered input-sm lg:w-80 max-w-xs my-3" />
                                                    <input type="text" defaultValue={email} {...register("email", {
                                                        required: {
                                                            value: true,
                                                            message: "email is required"
                                                        }
                                                    })} placeholder="email" className="input input-bordered input-sm  max-w-xs lg:w-80 mb-3" />
                                                    <input type="text" {...register("education", {
                                                        required: {
                                                            value: true,
                                                            message: "education is required"
                                                        }
                                                    })} placeholder="education" className="input input-bordered input-sm  max-w-xs lg:w-80 mb-3" />
                                                    <textarea {...register("address", {
                                                        required: {
                                                            value: true,
                                                            message: "address is required"
                                                        }
                                                    })} className="textarea textarea-bordered w-80" placeholder="address"></textarea>
                                                    <input type="number" {...register("phone", {
                                                        required: {
                                                            value: true,
                                                            message: "phone number is required"
                                                        }
                                                    })} placeholder="Phone number" className="input input-bordered input-sm max-w-xs lg:w-80 mb-3" />
                                                    <input type="text" {...register("socialLink", {
                                                        required: {
                                                            value: true,
                                                            message: "socialLink is required"
                                                        }
                                                    })} placeholder="socialLink" className="input input-bordered input-sm  max-w-xs lg:w-80 mb-3" />


                                                    <button className="btn btn-secondary text-white mt-3" type="submit">Update</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* button area */}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Link to="/dashboard">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >
    );
}


export default UpdateUser;