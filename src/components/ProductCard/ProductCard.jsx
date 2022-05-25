import React from 'react';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ item }) => {
    const navigate = useNavigate()
    const { _id, productName, description, image, qty, price } = item;
    const quantity = Number(qty)
    const handlePurchase = (id) => {
        navigate(`/purchase/${id}`)
    }
    return (
        <div className="card max-w-lg bg-base-100 shadow-xl">
            <figure className="p-12">
                <img src={image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center -mt-16">
                <h2 className="card-title">{productName}</h2>
                <p>{description}</p>
                <p>${price}</p>
                <p>Available QTY: {qty}</p>
                <div className="card-actions">
                    {
                        quantity > 0 ?
                            <button onClick={() => handlePurchase(_id)} className="btn btn-secondary text-white">Purchase</button>
                            : "Out of Stock"
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;