import React from 'react';
import ReviewsCard from '../../components/ReviewsCard/ReviewsCard';

const Reviews = () => {
    return (

        <div class="carousel max-w-full h-96">
            <div id="review1" class="carousel-item relative w-full flex justify-center items-center">
                <div className='flex justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2'>
                        <ReviewsCard id="review1" />
                        <ReviewsCard id="review1" />
                    </div>
                </div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#review3" class="btn btn-circle">❮</a>
                    <a href="#review2" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="review2" class="carousel-item relative w-full flex justify-center items-center">
                <div className='flex justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2'>
                        <ReviewsCard id="review2" />
                        <ReviewsCard id="review2" />
                    </div>
                </div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#review1" class="btn btn-circle">❮</a>
                    <a href="#review3" class="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="review3" class="carousel-item relative w-full flex justify-center items-center">
                <div className='flex justify-center items-center'>
                    <div className='grid grid-cols-2 gap-2'>
                        <ReviewsCard id="review3" />
                        <ReviewsCard id="review3" />
                    </div>
                </div>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#review2" class="btn btn-circle">❮</a>
                    <a href="#review1" class="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Reviews;