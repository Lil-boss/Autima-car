import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Banner from './Banner';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <div>
                <div className='w-4/5 mx-auto my-20'>
                    <div className='grid grid-cols-3 gap-3'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
            <Reviews />
        </div>
    );
};

export default Home;