import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from "../Firebase/firebase.init.js"
import Loading from '../../Extra/Loading/Loading.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state ? location.state.from : { pathname: "/" }
    const { register, handleSubmit } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const onSubmit = async (data) => {
        const { email, password, name } = data;
        const user = {
            name: name,
            email: email,
            isAdmin: false,
        }

        await createUserWithEmailAndPassword(email, password, { sendEmailVerification: true });
        await updateProfile({ displayName: data.name });
        await axios.post("https://autima.herokuapp.com/api/v1/auth", {
            user: email,
        })
            .then(res => {
                localStorage.setItem('accessToken', res.data.accessToken)
            })

        const fetchUser = async () => {
            try {
                await axios.post("https://autima.herokuapp.com/api/v1/users", user)
                    .then(res =>
                        toast.success("User created successfully", { id: "user" })
                    );

            } catch (err) {
                toast.error("Error creating user", { id: "user" })
            }
        }
        fetchUser();

    }

    if (gUser || user) {
        navigate(from, { replace: true })
    }
    if (gError || error || uError) {
        toast.error(error.message);
    }
    if (gLoading || loading || updating) {
        return <Loading />
    }
    return (
        <div className='flex justify-center items-center my-10'>
            <div className="card max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-4xl">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                        <input type="text" {...register("name", {
                            required: {
                                value: true,
                                message: "name is required"
                            }
                        })} placeholder="name" className="input input-bordered w-full max-w-xs" />
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
                            },
                            min: 6
                        })} placeholder="password" className="input input-bordered w-full max-w-xs my-3" />
                        <p className='mb-3'>Already have an account? <Link to="/login" className='text-secondary'>Login</Link></p>
                        <button className='btn btn-secondary w-full text-white'>Register</button>
                        <div className="divider">OR</div>
                    </form>
                    <button onClick={() => signInWithGoogle()} className="btn btn-active btn-primary w-full">With Google</button>
                </div>
            </div>
        </div >
    );
};

export default Register;