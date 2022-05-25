import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://autima.herokuapp.com/api/v1/order/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    toast.success("Order Cancelled Successfully", { id: "success" })
                })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/orders`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res =>
                        setOrders(res?.data?.data)
                    )
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [orders])

    const handlePayment = async (id) => {
        navigate(`/dashboard/payment/${id}`)
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Your name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>price</th>
                        <th>Total Price</th>
                        <th>Shipping Address</th>
                        <th>Status</th>
                        <th>payment</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        orders.map((order) =>
                            <>
                                <tr key={order._id}>
                                    <th>{order?.name}</th>
                                    <th>{order?.productName}</th>
                                    <th>{order?.qty}</th>
                                    <th>{order?.price}</th>
                                    <th>{order?.total}</th>
                                    <th>{order?.address}</th>
                                    <th>{order?.isDeliver ? 'Delivered' : 'Delivery pending'}</th>
                                    <th>{order?.isPaid === true ? "paid" :
                                        <button onClick={() => handlePayment(order?._id)} className='btn btn-info text-white'>pay</button>
                                    }</th>
                                    <th>
                                        {
                                            order?.isPaid === true ? ""
                                                :
                                                <button onClick={() => handleDelete(order?._id)} className='btn btn-error text-white'>Cancel</button>
                                        }
                                    </th>
                                </tr>
                            </>
                        )

                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;