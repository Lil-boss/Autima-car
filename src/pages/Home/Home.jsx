import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../Extra/footer/Footer';
import Banner from './Banner';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <div>
                <div className='w-4/5 mx-auto'>
                    <div className='grid grid-cols-3 gap-3  my-20'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                    <div>
                        <h1 className='text-5xl text-center mb-10'>Our Customer says</h1>
                        <Reviews />
                    </div>
                    <Footer />
                </div>
            </div>

        </div>
    );
};

export default Home;