import React from 'react';

const About = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-2 gap-2'>
                <div className='p-10'>
                    <img src="https://wordschools.com/wp-content/uploads/2021/07/Car-Parts-List.png" alt="" />
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <h2 className='text-4xl '>About</h2>
                    <h1 className='text-6xl font-light'>Autima Car</h1>
                    <p className='text-md font-thin mt-8'>We deliver original parts to our esteemed customers. Our company are car parts experts, we help to choose the best quality products.</p>
                    <a href="https://www.audi.com/en.html" target="_blank" rel='noreferrer'>
                        <button className='my-10 bg-[#FB9900] p-4 rounded-md text-white'>Lear more..</button>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default About;