import React from 'react';

const Blogs = () => {
    return (
        <div className='w-4/5 mx-auto mt-8 '>
            <div className='bg-green-50 rounded p-16 my-6'>
                <h1 className='text-[#515151] text-4xl'> How will you improve the performance of a React Application?</h1>
                <p className='ml-4 mt-2'>1.Using Immutable Data Structures</p>
                <p className='ml-4 mt-2'>2.Function/Stateless Components and React.PureComponent</p>
                <p className='ml-4 mt-2'>3.Multiple Chunk Files</p>
                <p className='ml-4 mt-2'>4.Using Production Mode Flag in Webpack</p>
                <p className='ml-4 mt-2'>5.Dependency optimization</p>
                <p className='ml-4 mt-2'>6.Use React.Fragments to Avoid Additional HTML Element Wrappers an etc</p>

            </div>
            <div className='bg-green-50 rounded p-16 my-6'>
                <h1 className='text-[#515151] text-4xl'>What are the different ways to manage a state in a React application?</h1>
                <p className='ml-4 mt-2'>Custom Hooks</p>
                <p className='ml-4 mt-2'>Global State Management</p>
                <p className='ml-4 mt-2'>Use Data Fetching Libraries</p>
            </div>
            <div className='bg-green-50 rounded p-16 my-6'>
                <h1 className='text-[#515151] text-4xl'>How does prototypical inheritance work?</h1>
                <p className='ml-4 mt-2'>In JavaScript, objects have a special hidden property [[Prototype], that is either null or references another object. That object is called "a prototype". When we read a property from object, and it's missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”</p>

            </div>
            <div className='bg-green-50 rounded p-16 my-6'>
                <h1 className='text-[#515151] text-4xl'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h1>

                <p className='ml-4'>When you directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value. you can lose control of the state across all components. </p>
            </div>
            <div className='bg-green-50 rounded p-16 my-6'>
                <h1 className='text-[#515151] text-4xl'>What is a unit test? Why should write unit tests?</h1>
                <p className='ml-4'>This is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness.</p>
            </div>
        </div>
    );
};

export default Blogs;