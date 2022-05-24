import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../Firebase/firebase.init.js"
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from : { pathname: "/" }
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => console.log(data);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if (user) {
        navigate(from, { replace: true })
    }
    if (error) {
        console.log(error);
    }
    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-4xl">Login</h2>
                    <form className='flex flex-col justify-center items-center'>
                        <input type="text" {...register("email", {
                            required: {
                                value: true,
                                message: "email is required"
                            }
                        })} placeholder="email" className="input input-bordered w-full max-w-xs mt-3" />
                        <input type="text" {...register("password", {
                            required: {
                                value: true,
                                message: "password is required"
                            }
                        })} placeholder="password" className="input input-bordered w-full max-w-xs my-3" />
                        <p>Don't have any account? <Link to="/register" className='text-secondary'>Register</Link></p>
                        <p className='mb-3'><Link to="/forget" className='text-secondary'>Forget password</Link></p>
                        <button className='btn btn-secondary w-full text-white'>Login</button>
                        <div className="divider">OR</div>
                    </form>
                    <button onClick={() => signInWithGoogle()} className="btn btn-active btn-primary w-full">Google Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;