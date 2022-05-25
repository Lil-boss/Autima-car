import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OurHistroy from '../../components/OurHistory/OurHistroy';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../Extra/footer/Footer';
import Banner from './Banner';
import Reviews from './Reviews';
import { useQuery } from 'react-query';
import Loading from "../Extra/Loading/Loading"
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Auth/Firebase/firebase.init';
const Home = () => {
    const [user] = useAuthState(auth)
    const { isLoading, isError, data: products } = useQuery(['products', user?.email], async () => {
        const result = await axios.get("https://autima.herokuapp.com/api/v1/products", {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return result.data.data
    });

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        console.log(isError);
    }

    const productData = products?.slice(0, 6);
    return (
        <div>
            <Banner />
            <div>
                <div className='w-4/5 mx-auto'>
                    <div className='grid grid-cols-3 gap-3  my-20'>
                        {
                            productData?.map(item => <ProductCard key={item?._id} item={item} />)
                        }
                    </div>
                    <div className="mb-20">
                        <OurHistroy />
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