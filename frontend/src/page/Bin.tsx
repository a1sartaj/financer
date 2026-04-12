import React, { useEffect, useState } from 'react'
import { Customer } from '../types/types'
import axiosInstance from '../api/axiosInstance'
import Spinner from '../components/ui/Spinner'
import {  useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/formateDate'
import { ArchiveRestore } from 'lucide-react'
import toast from 'react-hot-toast'

const Bin = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [loading2, setLoading2] = useState<boolean>(false)
    const [customers, setCustomers] = useState<Customer[] | []>([])

    const fetchCustomers = async () => {

        try {
            setLoading(true)

            const response = await axiosInstance.get('/customer/get-all-bin-customer')
            setCustomers(response.data.customers)
        } catch (error) {
            console.error(error)
            setCustomers([])
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchCustomers();
    }, [])


    const handleRestore = async (id: string) => {
        try {

            const response = await axiosInstance.delete(`/customer/restore-customer/${id}`)

            toast.success('Successfully delete')


            fetchCustomers()

        } catch (error) {
            console.error(error)
            toast.error("Failed to delete customer")
        } finally {
            setLoading2(false)
        }
    }


    if (loading) return <Spinner />

    if (customers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[80vh] text-center">
                <h1 className="text-2xl font-semibold text-red-500">
                    Customer Not Found
                </h1>
                <button
                    type='button'
                    onClick={() => navigate("/", { replace: true })}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded"
                >
                    Back to Home
                </button>
            </div>
        );
    }

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
                            <th className=' p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {customers.map((customer: Customer, index) => (

                            <tr key={index} className='border-t text-lg text-text-primary border-border' >
                                <td className="p-2"> {customer.name}</td>
                                <td className=" p-2">{formatDate(customer.openDate)}</td>
                                <td className=" p-2">{formatDate(customer.closeDate)}</td>
                                <td className={`p-2 font-medium ${customer && customer?.pendingBalance < 0 ? 'text-text-red' : 'text-secondary'}`}>₹{customer.pendingBalance}</td>
                                <td className={`p-2 text-white`}>
                                    <button
                                        disabled={loading2}
                                        type='button'
                                        className='bg-primary hover:bg-primary/70 cursor-pointer p-1 md:px-3 md:py-.5 rounded-lg flex gap-2 items-center'
                                        onClick={() => handleRestore(customer._id)}
                                    >
                                        <ArchiveRestore /> Restore
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>


            {/* Card show on mobile and deskop hide */}
            <div className='block md:hidden mt-4 space-y-2'>
                {
                    customers.map((customer: Customer, index) => (
                        <div key={index} className='relative rounded-lg border border-border p-4 text-white' >
                            <h3 className='text-primary font-bold text-xl' >{customer.name}</h3>
                            <p className='text-text-secondary text-base'>Open Date : {formatDate(customer.openDate)}</p>
                            <p className='text-text-secondary text-base'>Close Date : {formatDate(customer.closeDate)}</p>
                            <p className='text-text-primary text-base font-medium' >Pending : ₹{customer.pendingBalance}</p>

                            <button
                                title='button'
                                disabled={loading2}
                                type='button'
                                className='absolute right-3 top-3 bg-primary cursor-pointer p-1 md:px-3 md:py-.5 rounded-lg flex gap-2 items-center'
                                onClick={() => handleRestore(customer._id)}
                            >
                                <ArchiveRestore />
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Bin
