import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReviewsCard from '../../components/ReviewsCard/ReviewsCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/reviews", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        setReviews(res?.data?.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [reviews])
    return (
        <div>
            <div className='grid lg:grid-cols-3 gap-3'>
                {
                    reviews.map((review) => <ReviewsCard key={review._id} review={review} />)
                }
            </div>
        </div>
    );
};

export default Reviews;