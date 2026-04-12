import { X } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Customer, InputForm } from "../types/types";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { ReactFormState } from "react-dom/client";
import Spinner from "./ui/Spinner";

interface props {
    onClose: () => void;
    customer: Customer | null
    fetchCustomer: () => void;
}

const CustomerProfileUpdate = ({ onClose, customer, fetchCustomer }: props) => {

    const { id } = useParams();
    const [inputForm, setInputForm] = useState<InputForm>({
        name: '',
        phone: '',
        address: '',
        openDate: '',
        loanAmount: 0,
    })
    const [loading, setLoading] = useState<boolean>(false)



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputForm.address || !inputForm.loanAmount || !inputForm.name || !inputForm.openDate || !inputForm.phone) {
            toast.error("All fields are required")
            return
        }

        const newOpenDate = new Date(inputForm.openDate)
        const closeDateTimeStamp = newOpenDate.getTime() + 120 * 24 * 60 * 60 * 1000;

        const closeDate = new Date(closeDateTimeStamp);
        closeDate.setUTCHours(0, 0, 0, 0);


        try {

            setLoading(true)
            const response = await axiosInstance.put(`/customer/update-customer-profile/${id}`, { ...inputForm, closeDate })

            toast.success(response.data.message)
            onClose()
            fetchCustomer()

            setInputForm({
                name: '',
                accountNo: '',
                address: '',
                loanAmount: 0,
                openDate: '',
                phone: '',

            })


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

    useEffect(() => {
        if (customer) {

            const newDate = customer.openDate.split('T')[0]
            if (!newDate) return


            setInputForm({
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                openDate: newDate,
                loanAmount: customer.loanAmount,
            });
        }
    }, [customer]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        setInputForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div className='fixed z-100 inset-0 flex items-center justify-center w-full h-screen bg-black/90' >
            <form onSubmit={handleSubmit} className=' w-full max-w-3xl bg-white border border-border p-4 mt-4 md:mt-6 mx-2 md:mx-0 space-y-6  rounded-lg ' >

                <button type="button" onClick={onClose} >{<X />}</button>

                <div>
                    <label className='block'>Name</label>
                    <input
                        className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        placeholder="Enter customer name"
                        name="name"
                        value={inputForm.name}
                        onChange={handleOnChange}
                    />
                </div>

                <div className='flex gap-4' >
                    <div className="w-full">
                        <label className='block'>Phone</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[0-9]*"
                            className="border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full"
                            placeholder="Enter phone number"
                            name="phone"
                            value={inputForm.phone}
                            onChange={handleOnChange}
                        />
                    </div>

                </div>

                <div>
                    <label className='block' >Address</label>
                    <textarea
                        title="textarea"
                        className='w-full h-32 border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary '
                        name="address"
                        value={inputForm.address}
                        onChange={handleOnChange}

                    />
                </div>

                <div className='flex gap-4' >
                    <div className="w-full">
                        <label className='block'>Open Date</label>
                        <input
                            title="date-picker"
                            type="date"
                            className="border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full"
                            name="openDate"
                            value={inputForm.openDate}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="w-full">
                        <label className='block'>Loan Amount</label>
                        <input
                            title='loan-amount'
                            type="number"
                            className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                            name="loanAmount"
                            value={inputForm.loanAmount}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-4' >

                    <button
                        type='button'
                        className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition'
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button type="submit" disabled={loading} className={`px-4 text-lg font-semibold rounded-lg py-1 text-white  bg-primary`} >{loading ? "Updating..." : "Update"}</button>
                </div>


            </form>
        </div>
    )
}

export default CustomerProfileUpdate
