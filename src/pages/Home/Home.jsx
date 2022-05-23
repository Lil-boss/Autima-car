import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../Extra/footer/Footer';
import Banner from './Banner';
import Reviews from './Reviews';

const Home = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/products")
                    .then(res => {
                        setProduct(res?.data?.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProduct()
    }, [])
    return (
        <div>
            <Banner />
            <div>
                <div className='w-4/5 mx-auto'>
                    <div className='grid grid-cols-3 gap-3  my-20'>
                        {
                            product.map(item => <ProductCard key={item?._id} item={item} />)
                        }
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