import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OurHistroy from '../../components/OurHistory/OurHistroy';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../Extra/footer/Footer';
import Banner from './Banner';
import Reviews from './Reviews';

const Home = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/products", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        setProduct(res?.data?.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProduct()
    }, [product])
    const productData = product.slice(0, 6);
    return (
        <div>
            <Banner />
            <div>
                <div className='w-4/5 mx-auto'>
                    <div className='grid grid-cols-3 gap-3  my-20'>
                        {
                            productData.map(item => <ProductCard key={item?._id} item={item} />)
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