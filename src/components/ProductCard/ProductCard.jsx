import React from 'react';
const ProductCard = ({ item }) => {
    console.log(item);
    const { productName, description, image, price } = item;
    return (
        <div className="card max-w-lg bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{productName}</h2>
                <p>{description}</p>
                <p>${price}</p>
                <div className="card-actions">
                    <button className="btn btn-secondary text-white">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;