
import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

interface props {
    onClose: () => void;
    id: string;
    fetchCustomer: () => void;
}

const AddSingleEmi = ({ onClose, id, fetchCustomer }: props) => {
    // emiReceived, date
    const [emiReceived, setEmiReceived] = useState<number | "">("")
    const [date, setDate] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)


    const handleAddSingleEmi = async () => {

        if (emiReceived === null || emiReceived as number < 0 || emiReceived === '' || !date || date === '') {
            toast.error('Enter valid amout!')
            console.log(emiReceived)
            return
        }

        try {
            setLoading(true)
            const response = await axiosInstance.put(`/customer/add-single-emi-for-customer/${id}`, { emiReceived, date })
            toast.success("Successfully new emi")
            onClose()
            fetchCustomer()

        } catch (error) {
            toast.error("Failed to add new Emi")
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
                        value={emiReceived}
                        onChange={(e) => {
                            const value = e.target.value;
                            setEmiReceived(value === "" ? "" : Number(value));
                        }}
                        className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        placeholder='Enter new Amount'
                    />

                    <input
                        title='date-picker'
                        type="date"
                        className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        onChange={(e) => setDate(e.target.value)}
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
                            className="px-4 py-2 rounded-lg bg-secondary text-white transition"
                            onClick={handleAddSingleEmi}
                        >
                            Confirm
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddSingleEmi
