import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const AdminLoginPage = () => {
    axios.defaults.withCredentials = true;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { backendUrl } = useContext(AdminContext);

    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {

            const { data } = await axios.post(backendUrl + '/admin/login', {

                adminEmail: email,
                adminPassword: password
            })

            if (data.success) {
                toast.success(data.message)
                navigate('/admin')
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100 px-6 sm:px-0  '>
            <div className='w-full sm:w-96 p-8 bg-white rounded-lg shadow-lg' >
                <h2 className='text-2xl font-semibold mb-5 text-center'>Admin Login</h2>
                <form onSubmit={handleSubmitLogin}>
                    {/* email */}
                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold' htmlFor="">Email</label>
                        <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Type email' />
                    </div>


                    <div className='mb-4'>
                        <label className='block mb-2 font-semibold' htmlFor="">Password</label>
                        <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Type password' />
                    </div>

                    <button className='w-full bg-blue-600 text-white hover:bg-blue-900 rounded-xl font-semibold p-3 cursor-pointer' >Login</button>
                    <p className='mt-4 text-center text-gray-600'>New user? <span className='text-blue-600 hover:underline' >Signup</span> </p>
                </form>

            </div>
        </div>
    )
}

export default AdminLoginPage
