import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AllProduct = () => {
    const imageBB_KEY = "0732f1601daecdd2eb43b8f7ea03eb41";
    const { register, handleSubmit } = useForm();
    const [products, setProducts] = useState([]);
    const onSubmit = async (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageBB_KEY}`;
        await axios.post(url, formData)
            .then(res => {
                const result = res.data;
                if (result.success === true) {
                    const img = result.data.url
                    const price = Number(data.price)
                    const quantity = Number(data.qty);
                    const total = price * quantity;
                    const product = {
                        productName: data.productName,
                        description: data.description,
                        price: data.price,
                        qty: data.qty,
                        image: JSON.stringify(img),
                        totalPrice: JSON.stringify(total)
                    }
                    const fetchData = async () => {
                        await axios.post("https://autima.herokuapp.com/api/v1/products", product)
                            .then(res => console.log(res.data));
                    }
                    fetchData();
                }
            });
    }


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
                    {/* modal */}
                    <input type="checkbox" id="added-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <label htmlFor="added-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="font-bold text-lg">Add Product</h3>
                            <div className='mt-3'>
                                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 justify-items-center'>
                                    <input type="text" {...register("productName", {
                                        required: {
                                            value: true,
                                            message: "productName is required"
                                        }
                                    })} placeholder="product Name" className="input input-bordered input-sm w-full max-w-xs" />
                                    <textarea {...register("description", {
                                        required: {
                                            value: true,
                                            message: "description is required"
                                        }
                                    })} className="textarea textarea-bordered w-80" placeholder="Description"></textarea>
                                    <input type="text" {...register("price", {
                                        required: {
                                            value: true,
                                            message: "Price is required"
                                        }
                                    })} placeholder="Price" className="input input-bordered input-sm w-full max-w-xs" />
                                    <input type="text" {...register("qty", {
                                        required: {
                                            value: true,
                                            message: "quantity is required"
                                        }
                                    })} placeholder="Quantity" className="input input-bordered input-sm w-full max-w-xs" />
                                    <div>
                                        <p>Select Image</p>
                                        <input type="file" {...register("image", {
                                            required: {
                                                value: true,
                                                message: "image is required"
                                            }
                                        })} />
                                    </div>
                                    <button className="btn btn-secondary text-white" type="submit">Add Product</button>
                                </form>
                            </div>
                        </div >
                    </div >
                </div >
            </div>
            {/* //table */}
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