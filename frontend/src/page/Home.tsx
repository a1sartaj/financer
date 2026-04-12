import React, { useEffect, useState } from 'react'
import Spinner from '../components/ui/Spinner'
import axiosInstance from '../api/axiosInstance'
import { Customer } from '../types/types'
import { formatDate } from '../utils/formateDate'
import { Link } from 'react-router-dom'

const Home = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [customers, setCustomers] = useState<Customer[] | []>([])

    const fetchCustomers = async () => {

        try {
            setLoading(true)

            const response = await axiosInstance.get('/customer/get-all-customer')
            setCustomers(response.data.customers)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    if (loading) return <Spinner />

    return (
        <div className='w-full max-w-6xl mx-auto' >
            <h1 className='text-primary text-2xl md:text-3xl font-semibold' >Customer List</h1>

            {/* It show on Desktop mode */}
            <div className='hidden md:block mt-4 border border-border rounded-md overflow-hidden' >
                <table className='w-full text-base text-text-secondary text-left'>
                    <thead>
                        <tr className='bg-hard-background'>
                            <th className='  p-2'>Name</th>
                            <th className=' p-2'>Open Date</th>
                            <th className=' p-2'>Close Date</th>
                            <th className=' p-2'>Pending</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {customers.map((customer: Customer, index) => (

                            <tr key={index} className='border-t text-lg text-text-primary border-border' >
                                <td className="p-2 hover:text-primary hover:translate-x-1 transition-all duration-300 ease-in"> <Link to={`/customer/${customer._id}`} >{customer.name}</Link> </td>
                                <td className=" p-2">{formatDate(customer.openDate)}</td>
                                <td className=" p-2">{formatDate(customer.closeDate)}</td>
                                <td className={`p-2 font-medium ${customer && customer?.pendingBalance < 0 ? 'text-text-red' : 'text-secondary'}`}>₹{customer.pendingBalance}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>


            {/* Card show on mobile and deskop hide */}
            <div className='block md:hidden mt-4 space-y-2'>
                {
                    customers.map((customer: Customer, index) => (
                        <div key={index} className='rounded-lg border border-border p-4' >
                            <h3 className='text-primary font-bold text-xl' ><Link to={`/customer/${customer._id}`}>{customer.name}</Link></h3>
                            <p className='text-text-secondary text-base'>Open Date : {formatDate(customer.openDate)}</p>
                            <p className='text-text-secondary text-base'>Close Date : {formatDate(customer.closeDate)}</p>
                            <p className='text-text-primary text-base font-medium' >Pending : ₹{customer.pendingBalance}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
