import React from 'react';

const OurHistroy = () => {
    return (
        <div className=''>
            <h1 className='text-6xl text-center mb-8'>Our History</h1>
            <div className='grid lg:grid-cols-4 gap-1'>
                <div class="card mx-w-lg bg-base-100 shadow-xl h-80">
                    <div class="text-center p-4 mt-10">
                        <i class="fa-regular fa-circle-check text-5xl text-secondary"></i>
                        <h2 class="text-center text-2xl mt-4">40 Years Experience</h2>
                        <p>With over 40 years of experience, the Autima brings you innovative signage solutions.</p>
                    </div>
                </div>
                <div class="card mx-w-lg bg-base-100 shadow-xl h-80">
                    <div class="text-center p-4 mt-10">
                        <i class="fa-regular fa-circle-check text-5xl text-secondary"></i>
                        <h2 class="text-center text-2xl mt-4">Certified Company</h2>
                        <p> We ISO certified company is serious about maintaining appropriate specifications for every product, service and system.</p>
                    </div>
                </div>
                <div class="card mx-w-lg bg-base-100 shadow-xl h-80">
                    <div class="text-center p-4 mt-10">
                        <i class="fa-regular fa-circle-check text-5xl text-secondary"></i>
                        <h2 class="text-center text-2xl mt-4">Supplier in Region</h2>
                        <p>At Autima, we create opportunities for you to connect to the hundreds of corporate members who wish to build relationships with trusted MBEs, like you.</p>
                    </div>
                </div>
                <div class="card mx-w-lg bg-base-100 shadow-xl h-80">
                    <div class="text-center p-4 mt-10">
                        <i class="fa-regular fa-circle-check text-5xl text-secondary"></i>
                        <h2 class="text-center text-2xl mt-4">Best in the Market</h2>
                        <p>we are the best competitive in these various geographical regions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurHistroy;