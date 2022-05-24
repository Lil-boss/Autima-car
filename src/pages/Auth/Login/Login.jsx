import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../Firebase/firebase.init.js"
import Loading from '../../Extra/Loading/Loading.jsx';
import toast from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from : { pathname: "/" }
    const { register, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message);
        }
    }

    if (user || gUser) {
        navigate(from, { replace: true });
        toast.success("Login Successful", { id: "success" });
    }
    if (error || gError) {
        if (error.message.includes("auth/wrong-password")) {
            toast.error("wrong password", { id: "wrong" })
        }
        if (error.message.includes("auth/user-not-found")) {
            toast.error("user Not Found", { id: "wrong" })
        }
    }
    if (gLoading || loading) {
        return <Loading />
    }
    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-4xl">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                        <input type="email" {...register("email", {
                            required: {
                                value: true,
                                message: "email is required"
                            }
                        })} placeholder="email" className="input input-bordered w-full max-w-xs mt-3" />
                        <input type="password" {...register("password", {
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