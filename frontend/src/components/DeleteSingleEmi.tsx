import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

interface props {
    id: string;
    repaymentId: string;
    onClose: () => void;
    fetchCustomer: () => void;
}

const DeleteSingleEmi = ({ id, repaymentId, onClose, fetchCustomer }: props) => {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSingleEmiDelete = async () => {

        try {
            setLoading(true)
            const response = await axiosInstance.put(`/customer/delete-single-emi-from-customer/${id}`, { repaymentId })
            toast.success("Successfully delete")
            onClose()
            fetchCustomer()

        } catch (error) {
            toast.error("Failed to delete emi")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            {/* Modal Card */}
            <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Delete Confirmation
                </h2>

                {/* Message */}
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure to delete this emi entry?
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    <button
                        disabled={loading}
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        type="button"
                        onClick={handleSingleEmiDelete}
                        className={`px-4 py-2 rounded-lg  bg-text-red text-white transition`}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}

export default DeleteSingleEmi
