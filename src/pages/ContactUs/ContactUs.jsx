import React from 'react';

const ContactUs = () => {
    return (
        <div className='mt-12'>
            <div className='m-y-10 h-32 bg-gray-500 flex flex-col items-center justify-center'>
                <h1 className='text-center text-5xl text-white'>Contact Us</h1>
                <p className='text-white text-sm sm:p-4 text-center'>Autima is best Manufacturing industry for car parts</p>
            </div>
            <div className='w-4/5 mx-auto my-8 '>
                <div className='grid md:grid-cols-2 gap-6 justify-items-center'>
                    <div className='bg-secondary w-8/12'>
                        <div className='py-28 px-16 text-white'>
                            <div className='mb-8'>
                                <h3 className='text-3xl mb-3'>Address</h3>
                                <p className='text-sm '>256, Centerl Town, Main Street <br /> Hilton Tower, New Yourk</p>
                                <p>------------------------------------------</p>
                            </div>

                            <div className='mb-8'>
                                <h3 className='text-3xl mb-3'>Phone</h3>
                                <p className='text-sm '>+8801265 897 568
                                    <br /> +8801235 598 656</p>
                                <p>------------------------------------------</p>
                            </div>
                            <div>
                                <h3 className='text-3xl mb-3'>Web</h3>
                                <p className='text-sm '>info@yourweb.com <br /> www.yourweb.com</p>
                                <p>------------------------------------------</p>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className='flex flex-col items-start'>
                            <h2 className='text-3xl mb-8'>Get in Touch</h2>
                            <p className='text-sm '>Terms & Conditions soothes and corrupts the pain and the annoyances you will receive</p>
                        </div>
                        <div >
                            <div>
                                <input className='border-2 ml-2 mt-8 h-12 p-2' type="text" name="" id="" placeholder='Name' />
                                <input className='border-2 ml-2 mt-8 h-12 p-2' type="text" name="" id="" placeholder='Email' />
                            </div>
                            <div>
                                <input className='border-2 ml-2 mt-8 h-12 p-2' type="text" name="" id="" placeholder='Phone' />
                                <input className='border-2 ml-2 mt-8 h-12 p-2' type="text" name="" id="" placeholder='Subject' />
                            </div>
                            <div>
                                <input className='border-2 ml-2 mt-8 h-32 p-2 w-5/6' type="text-area" name="" id="" placeholder='Message' />
                            </div>
                            <button className='h-10 w-32 mt-10 ml-2 text-white bg-secondary ' type="submit">SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;