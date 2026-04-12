import React, { useState } from 'react'
import { Customer } from '../types/types'
import { formatDate } from '../utils/formateDate'
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

interface props {
    id: string;
    repaymentId: string;
    onClose: () => void;
    fetchCustomer: () => void;
}

const EditEmi = ({ id, repaymentId, onClose, fetchCustomer }: props) => {

    const [newAmount, setNewAmount] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false)

    const handleEditEmi = async () => {


        if (newAmount === null || newAmount as number < 0 || newAmount === '') {
            toast.error('Enter valid amout!')
            console.log(newAmount)
            return
        }

        try {

            setLoading(true)

            const response = await axiosInstance.put(`/customer/update-single-emi/${id}`, { newAmount, repaymentId })
            toast.success("Update successfully")
            onClose()
            fetchCustomer()

        } catch (error) {
            toast.error("Failed to update EMI")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed z-100 inset-0 flex items-center justify-center w-full h-screen bg-black/90 '>

            <div className='bg-white p-4 rounded-xl w-full max-w-3xl mx-2 md:mx-0' >

                <button type="button" onClick={onClose} >{<X />} </button>


                <div className='flex flex-col gap-4 mt-4' >
                    <input
                        type="number"
                        value={newAmount}
                        onChange={(e) => {
                            const value = e.target.value;
                            setNewAmount(value === "" ? "" : Number(value));
                        }}
                        className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        placeholder='Enter new Amount'
                    />


                    <div className='flex justify-end gap-4' >
                        <button
                            disabled={loading}
                            type='button'
                            className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition'
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            type='button'
                            className="px-4 py-2 rounded-lg bg-primary text-white transition"
                            onClick={handleEditEmi}
                        >
                            Confirm
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditEmi
