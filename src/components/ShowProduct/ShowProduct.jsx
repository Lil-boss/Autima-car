import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
const ShowProduct = () => {
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
    return (
        <div className='w-4/5 mx-auto mt-10'>
            <div className='grid grid-cols-3 gap-4'>
                {
                    product.map(item => <ProductCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default ShowProduct;