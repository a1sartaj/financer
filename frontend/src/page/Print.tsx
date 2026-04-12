import React, { useEffect, useState } from 'react'
import { Customer } from '../types/types'
import axiosInstance from '../api/axiosInstance'
import { formatDate } from '../utils/formateDate'
import Spinner from '../components/ui/Spinner'

const Print = () => {

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

    const total = customers.reduce((sum, val) => sum + val.EMIAmount, 0)


    if (loading) return <Spinner />

    return (
        <div className='container mx-auto mt-8' >
            <table className='w-full border-collapse'>
                <thead className='print-header'>
                    <tr>
                        <th className='border px-0.5'>N</th>
                        <th className='border'>Name</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border'>EMI</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border px-0.5'>AC.No</th>
                        <th className='border px-0.5'>Amt</th>
                        <th className='border'>O-Date</th>
                        <th className='border'>C-Date</th>
                        <th className='border px-0.5'>Pending</th>
                        <th className='border px-0.5'>Balance</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        customers.map((customer, index) => {

                            return (
                                <tr className={`${customer.EMICount > 120 && 'font-bold bg-gray-200'}`} key={customer._id}>
                                    <td className='border py-1 px-1 text-center w-8'>{index + 1}</td>
                                    <td className='border py-1 px-1 '>{customer.name}</td>
                                    <td className='border text-center w-12 '></td>
                                    <td className='border py-1 text-center w-10'>{customer.EMIAmount}</td>
                                    <td className='border text-center w-12 '></td>
                                    <td className='border py-1 text-center w-10'>{customer.accountNo}</td>
                                    <td className='border text-center w-12 '></td>
                                    <td className='border py-1  text-center w-20'>{formatDate(customer.openDate)}</td>
                                    <td className='border py-1  text-center w-20'>{formatDate(customer.closeDate)}</td>
                                    <td className='border py-1 px-1 text-center w-14'>{customer.pendingBalance}</td>
                                    <td className='border py-1 px-1 text-center w-14'>{customer.balance}</td>
                                </tr>
                            )
                        }
                        )}
                </tbody>
            </table>

            <div className='text-center mt-4 font-medium'>
                ₹{total}
            </div>

        </div>
    )
}

export default Print
