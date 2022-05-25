import { Dialog, Transition } from '@headlessui/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import auth from '../../pages/Auth/Firebase/firebase.init';

const Payments = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null);
    const stripe = useStripe();
    const elements = useElements()
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            await axios.post("https://autima.herokuapp.com/api/v1/create-payment-intent", {
                amount: amount,
            })
                .then(res => {
                    setClientSecret(res?.data?.clientSecret)
                })
        };
        fetchItem();
    }, [amount])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }
        else {
            setError('');
        }

        //confirm payment
        const { paymentIntent, payError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            },
        );
        if (payError) {
            setError(payError?.message);
        } else {
            if (paymentIntent?.status === 'succeeded') {
                const fetchData = async () => {
                    try {
                        await axios.put(`https://autima.herokuapp.com/api/v1/order/${id}`, {
                            isPaid: true,
                            transitionId: paymentIntent?.id
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
                fetchData()
                toast.success("Payment Successful!", { id: 'success' });
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`https://autima.herokuapp.com/api/v1/order/${id}`)
                    .then(res => {
                        setAmount(res?.data?.data?.total)
                    })
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [id])
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    <p className='text-center text-2xl mb-4'>Payment Cart</p>
                                </Dialog.Title>
                                <div>
                                    <p className='mb-6 text-2xl'>Payable Amount:${amount}</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: '16px',
                                                    color: '#424770',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                            },
                                        }}
                                    />
                                    <p className='mt-2 text-error'>{error}</p>
                                    <button className='btn btn-secondary text-white mt-6 w-full' type="submit" disabled={!stripe || !clientSecret}>
                                        Pay
                                    </button>
                                </form>
                            </div>
                            {/* button area */}
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Link to="/dashboard/orders">
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >
    );
};

export default Payments;