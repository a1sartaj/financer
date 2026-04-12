import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

interface props {
    onClose: () => void;
    id: string
}

const ConfirmDelete = ({ id, onClose }: props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const handleOnDelete = async () => {
        try {
            setLoading(true)

            const response = await axiosInstance.put(`/customer/delete-customer/${id}`)
            toast.success("Successfully Delete")
            onClose()
            navigate('/', { replace: true })

        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error?.response?.data?.message)
            } else {
                toast.error("Internal server error")
                console.log(error)
            }
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
                    Are you sure you want to delete this customer?
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
                        onClick={handleOnDelete}
                        className={`px-4 py-2 rounded-lg bg-text-red text-white transition`}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmDelete
