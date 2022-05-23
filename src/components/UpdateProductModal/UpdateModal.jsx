import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateModal = () => {
    const { id } = useParams()
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null);
    const [product, setProduct] = useState({})
    const { register, handleSubmit } = useForm();
    const { productName, description, price, qty } = product;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/product/${id}`)
                    .then(res => setProduct(res.data.data))
            } catch (err) {
                console.log(err);
            }
        }
        fetchProduct()
    }, [id])
    const onSubmit = async (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageBB_KEY}`;
        console.log(url);
        await axios.post(url, formData)
            .then(res => {
                const result = res.data;
                if (result.success === true) {
                    const img = result.data.url
                    const price = Number(data.price)
                    const quantity = Number(data.qty);
                    const total = price * quantity;
                    const product = {
                        productName: data.productName,
                        description: data.description,
                        price: data.price,
                        qty: data.qty,
                        image: img,
                        totalPrice: JSON.stringify(total)
                    }
                    const fetchData = async () => {
                        await axios.put(`https://autima.herokuapp.com/api/v1/product/${id}`, product)
                            .then(res => {
                                toast.success("Product Updated Successfully", { id: "success" })
                            });
                    }
                    fetchData();
                }
            });


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

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                                            {product?.productName}
                                        </Dialog.Title>
                                        <div className='grid sm:grid-cols-1 justify-items-center md:grid-cols-2 gap-3 '>
                                            <div className='w-4/5 mx-auto'>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <input type="text" {...register("productName", {
                                                        required: {
                                                            value: true,
                                                            message: "productName is required"
                                                        }
                                                    })} defaultValue={productName} placeholder="product Name" className="input input-bordered input-sm w-full max-w-xs my-3" />
                                                    <textarea {...register("description", {
                                                        required: {
                                                            value: true,
                                                            message: "description is required"
                                                        }
                                                    })} className="textarea textarea-bordered w-80" defaultValue={description} placeholder="Description"></textarea>
                                                    <input type="number" {...register("price", {
                                                        required: {
                                                            value: true,
                                                            message: "Price is required"
                                                        }
                                                    })} defaultValue={price} placeholder="Price" className="input input-bordered input-sm w-full max-w-xs mb-3" />
                                                    <input type="number" {...register("qty", {
                                                        required: {
                                                            value: true,
                                                            message: "quantity is required"
                                                        }
                                                    })} defaultValue={qty} placeholder="Quantity" className="input input-bordered input-sm w-full max-w-xs mb-3" />
                                                    <div>
                                                        <p>Select Image</p>
                                                        <input type="file" {...register("image", {
                                                            required: {
                                                                value: true,
                                                                message: "image is required"
                                                            }
                                                        })} />
                                                    </div>
                                                    <button className="btn btn-secondary text-white mt-3" type="submit">Update Product</button>
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
};

export default UpdateModal;