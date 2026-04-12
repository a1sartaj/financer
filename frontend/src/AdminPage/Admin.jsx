import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import toast from 'react-hot-toast';
import axios from 'axios';

const Admin = () => {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoginAdmin, backendUrl } = useContext(AdminContext)

  useEffect(() => {
    isLoginAdmin();
  }, [])

  const handleCreatFinancer = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post(backendUrl + '/financer/register', {
        name, email, password
      })

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='px-4 md:px-10 mt-24 bg-red-300 flex justify-between flex-col md:flex-row' >

      <aside className='w-full md:border-r md:w-md py-4'>
        <div className='text-right mb-4'>
          <button className='bg-blue-600 px-3 py-1 text-white font-medium text-lg rounded-full'>Add</button>
        </div>

        <div className='flex flex-col gap-4'>


          {/* User card */}
          <div className='border  md:border-r-0 bg-blue-300 px-4 py-2'>
            <div className='flex justify-between items-center'>
              <h2 className=''>Sartaj Alam</h2>
              <div>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
              </div>
            </div>
          </div>

          <div className='border  md:border-r-0 bg-blue-300 px-4 py-2'>
            <div className='flex justify-between items-center'>
              <h2 className=''>Sartaj Alam</h2>
              <div>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
              </div>
            </div>
          </div>

          <div className='border  md:border-r-0 bg-blue-300 px-4 py-2'>
            <div className='flex justify-between items-center'>
              <h2 className=''>Sartaj Alam</h2>
              <div>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Edit</button>
                <button className='px-2 py-1 rounded-full hover:bg-blue-600 hover:text-white'>Delete</button>
              </div>
            </div>
          </div>



        </div>

      </aside>

      <div className='flex justify-center items-center w-2/3  '>
        
      </div>

    </div>
  )
}

export default Admin
