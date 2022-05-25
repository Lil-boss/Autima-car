import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReviewsCard from '../../components/ReviewsCard/ReviewsCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/reviews")
                    .then(res => {
                        setReviews(res.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [reviews])

    const reviewsData = reviews.slice(0, 3);
    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                {
                    reviewsData.map((review) => <ReviewsCard key={review._id} review={review} />)
                }
            </div>
        </div>
    );
};

export default Reviews;