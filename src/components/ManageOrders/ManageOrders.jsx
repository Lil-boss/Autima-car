import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://autima.herokuapp.com/api/v1/order/${id}`)
                .then(res => {
                    console.log(res);
                })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/orders`)
                    .then(res =>
                        setOrders(res?.data?.data)
                    )
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [orders])
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>customer name</th>
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
                            <tr key={order._id}>
                                <th>{order?.name}</th>
                                <th>{order?.productName}</th>
                                <th>{order?.qty}</th>
                                <th>{order?.price}</th>
                                <th>{order?.total}</th>
                                <th>{order?.address}</th>
                                <th>{order?.isDeliver ? 'Delivered' : 'Pending'}</th>
                                <th>{order?.isPaid === true ? "paid" : "unpaid"}</th>
                                <th>
                                    <button onClick={() => handleDelete(order?._id)} className='btn btn-error text-white'>Cancel</button>
                                    {
                                        order?.isPaid === true ? <button className='btn btn-secondary text-white ml-3'>Delivery</button>
                                            :
                                            ""
                                    }
                                </th>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;