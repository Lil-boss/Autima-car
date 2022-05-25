import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../pages/Auth/Firebase/firebase.init';
const AllReviews = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const [reviews, setReviews] = useState([]);
    const { displayName, email } = user;
    console.log(email);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/review/${email}`)
                    .then(res => {
                        setReviews(res?.data?.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [email])
    const onSubmit = async (data) => {
        const { name, email, reviewTitle, description, ratings } = data;
        const review = {
            name: name,
            email: email,
            reviewTitle: reviewTitle,
            reviewDes: description,
            rating: ratings
        }
        const fetchData = async () => {
            try {
                await axios.post("https://autima.herokuapp.com/api/v1/reviews", review)
                    .then(res => {
                        toast.success("Review Added Successfully", { id: "success" })
                    });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    };
    const handleDelete = async (id) => {
        const fetchData = async () => {
            try {
                await axios.delete(`https://autima.herokuapp.com/api/v1/review/${id}`)
                    .then(res => {
                        toast.success("Review Deleted Successfully", { id: "success" })
                    });
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }
    return (
        <div>
            <div className='flex justify-start items-center'>
                <h1 className='text-4xl'>All Reviews</h1>
                <label className="btn btn-secondary border-none text-white ml-8" htmlFor="added-modal">Add Reviews</label>
                <div>
                    {/* modal */}
                    <input type="checkbox" id="added-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="added-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="font-bold text-lg">Add Reviews</h3>
                            <div className='mt-3'>
                                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 justify-items-center'>
                                    <input type="text" defaultValue={displayName}{...register("name", {
                                        required: {
                                            value: true,
                                            message: "name is required"
                                        }
                                    })} placeholder="Name" className="input input-bordered input-sm w-full max-w-xs" />

                                    <input type="email" defaultValue={email} {...register("email", {
                                        required: {
                                            value: true,
                                            message: "email is required"
                                        }
                                    })} placeholder="email" className="input input-bordered input-sm w-full max-w-xs" />

                                    <input type="text" {...register("reviewTitle", {
                                        required: {
                                            value: true,
                                            message: "reviewTitle is required"
                                        }
                                    })} placeholder="review title" className="input input-bordered input-sm w-full max-w-xs" />

                                    <textarea {...register("description", {
                                        required: {
                                            value: true,
                                            message: "description is required"
                                        }
                                    })} className="textarea textarea-bordered w-80" placeholder="Description"></textarea>
                                    <input type="text" {...register("ratings", {
                                        required: {
                                            value: true,
                                            message: "ratings is required"
                                        }
                                    })} placeholder="ratings 1 to 5" className="input input-bordered input-sm w-full max-w-xs" />

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
                            <th>Title</th>
                            <th>Description</th>
                            <th>Ratings</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map(review => <tr key={review._id}>
                                <td>{review.reviewTitle}</td>
                                <td>{review.reviewDes}</td>
                                <td>{review.rating}</td>
                                <td>
                                    <button onClick={() => handleDelete(review._id)} className='btn btn-error text-white'>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;