import React from 'react';
import { useForm } from 'react-hook-form';

const AllReviews = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => console.log(data);
    return (
        <div>
            <div className='flex justify-start items-center'>
                <h1 className='text-4xl'>All Product</h1>
                <label className="btn btn-secondary border-none text-white ml-8" htmlFor="added-modal">Add Product</label>
                <div>
                    {/* modal */}
                    <input type="checkbox" id="added-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="added-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="font-bold text-lg">Add Product</h3>
                            <div className='mt-3'>
                                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 justify-items-center'>
                                    <input type="text" {...register("name", {
                                        required: {
                                            value: true,
                                            message: "name is required"
                                        }
                                    })} placeholder="Name" className="input input-bordered input-sm w-full max-w-xs" />
                                    <textarea {...register("description", {
                                        required: {
                                            value: true,
                                            message: "description is required"
                                        }
                                    })} className="textarea textarea-bordered w-80" placeholder="Description"></textarea>

                                    <button className="btn btn-secondary text-white" type="submit">Add Review</button>
                                </form>
                            </div>
                        </div >
                    </div >
                </div >
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                        products.map(product => <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                        </tr>)
                    } */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;