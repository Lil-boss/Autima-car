import axios from "axios";
import { useEffect, useState } from "react";

const AllProduct = () => {
    const [products, setProducts] = useState([]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/products")
                    .then(res => {
                        setProducts(res.data.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [products])
    return (
        <div>
            <div className='flex justify-start items-center'>
                <h1 className='text-4xl'>All Product</h1>
                <label className="btn btn-secondary border-none text-white ml-8" htmlFor="added-modal">Add Product</label>
                <div>
                    <input type="checkbox" id="added-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="added-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="font-bold text-lg">Add Product</h3>
                            <div className='mt-3'>
                                <form className='grid grid-cols-1 gap-4 justify-items-center'>
                                    <input type="text" placeholder="product Name" className="input input-bordered input-sm w-full max-w-xs" />
                                    <textarea className="textarea textarea-bordered w-80" placeholder="Description"></textarea>
                                    <input type="text" placeholder="Price" className="input input-bordered input-sm w-full max-w-xs" />
                                    <div>
                                        <p>Select Image</p>
                                        <input type="file" />
                                    </div>
                                    <button className="btn btn-secondary text-white" type="submit">Add Product</button>
                                </form>
                            </div>
                        </div >
                    </div >
                </div >
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock Quantity</th>
                            <th>Sell Quantity</th>
                            <th>Available Quantity</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => <tr key={product._id}>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.qty}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllProduct;