import React from 'react';

const ReviewsCard = ({ review }) => {
    const { name, reviewTitle, reviewDes, rating } = review;
    return (
        <div className="card max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl">{reviewTitle}</h2>
                <p className='text-xl'>{reviewDes}</p>
                <p className='text-2xl'>{rating}<i className="fas fa-star text-primary"></i></p>
                <small>{name}</small>
            </div>
        </div>
    );
};

export default ReviewsCard;