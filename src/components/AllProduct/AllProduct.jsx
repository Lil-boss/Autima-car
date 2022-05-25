import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {

    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [products, setProducts] = useState([]);
    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageBB_KEY}`;
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
                        image: img,
                        totalPrice: JSON.stringify(total)
                    }
                    const fetchData = async () => {
                        await axios.post("https://autima.herokuapp.com/api/v1/products", {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        }, product)
                            .then(res => {
                                toast.success("Product Added Successfully", { id: "success" })
                            });
                    }
                    fetchData();
                }
            });
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await axios.get("https://autima.herokuapp.com/api/v1/products", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                        setProducts(res.data.data)
                    })

            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts()
    }, [products])


    const handleDelete = async (id) => {
        await axios.delete(`https://autima.herokuapp.com/api/v1/product/${id}`)
            .then(res =>
                toast.success("Product Deleted Successfully", { id: "success" })
            );
    }

    const handleUpdate = (id) => {
        navigate(`/dashboard/update/${id}`);
    }
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
                                    <input type="number" {...register("price", {
                                        required: {
                                            value: true,
                                            message: "Price is required"
                                        }
                                    })} placeholder="Price" className="input input-bordered input-sm w-full max-w-xs" />
                                    <input type="number" {...register("qty", {
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
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleUpdate(product._id)} className="btn p-2 bg-secondary text-white mr-2 border-none">Edit</button>
                                    <button onClick={() => handleDelete(product._id)} className="btn p-2 bg-error text-white border-none">Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default AllProduct;