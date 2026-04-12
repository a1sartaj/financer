import { ChangeEvent, useState } from "react";
import { InputForm } from "../types/types";
import { AwardIcon } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import Spinner from "../components/ui/Spinner";


const AddNewCustomer = () => {

    const [inputForm, setInputForm] = useState<InputForm>({
        name: '',
        phone: '',
        accountNo: '',
        address: '',
        openDate: '',
        loanAmount: 0
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>): void => {
        const { value, name } = e.target;

        setInputForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlOnSubmit = async (e: any) => {
        e.preventDefault();

        if (!inputForm.accountNo || !inputForm.address || !inputForm.loanAmount || !inputForm.name || !inputForm.openDate || !inputForm.phone) {
            toast.error("All fields are required")
            return
        }

        const newOpenDate = new Date(inputForm.openDate)
        const closeDateTimeStamp = newOpenDate.getTime() + 120 * 24 * 60 * 60 * 1000;

        const closeDate = new Date(closeDateTimeStamp);
        closeDate.setUTCHours(0, 0, 0, 0);

        try {

            setLoading(true)

            const response = await axiosInstance.post('/customer/add-new-customer', { ...inputForm, closeDate })

            toast.success(response.data.message)

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

    return (
        <div className='flex flex-col items-center  w-full md:mt-16' >
            <h1 className='w-full max-w-3xl font-semibold text-primary text-2xl md:text-4xl' >Add New Customer</h1>

            <form onSubmit={handlOnSubmit} className='w-full p-4 mt-4 md:mt-6 space-y-6 max-w-3xl bg-hard-background rounded-lg border border-border' >

                <div>
                    <label className='block'>Name</label>
                    <input
                        title="name"
                        type="text"
                        name='name'
                        value={inputForm.name}
                        onChange={handleOnChange}
                        className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        placeholder="Enter customer name"
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
                            onChange={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                            className="border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full"
                            placeholder="Enter phone number"
                            onChangeCapture={handleOnChange}
                            name="phone"
                            value={inputForm.phone}
                        />
                    </div>

                    <div className="w-full">
                        <label className='block'>Account no</label>
                        <input
                            title='accountNo'
                            name="accountNo"
                            onChange={handleOnChange}
                            value={inputForm.accountNo}
                            type="text"
                            className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        />


                    </div>
                </div>

                <div>
                    <label className='block' >Address</label>
                    <textarea
                        title="Address"
                        name="address"
                        value={inputForm.address}
                        onChange={handleOnChange}
                        className='w-full h-32 border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary '
                    />
                </div>

                <div className='flex gap-4' >
                    <div className="w-full">
                        <label className='block'>Open Date</label>
                        <input
                            title='open-date'
                            name="openDate"
                            value={inputForm.openDate}
                            type="date"
                            onChange={handleOnChange}
                            className="border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full"
                        />
                    </div>

                    <div className="w-full">
                        <label className='block'>Loan Amount</label>
                        <input
                            title='loan-amount'
                            type="number"
                            name="loanAmount"
                            value={inputForm.loanAmount === 0 ? '' : inputForm.loanAmount}
                            onChange={handleOnChange}
                            onWheel={(e) => e.currentTarget.blur()}
                            className='border border-border bg-white rounded-lg text-base px-2 py-2 outline-primary w-full'
                        />
                    </div>
                </div>

                <button disabled={loading} type="submit" className={`w-full text-lg font-semibold rounded-lg py-1 text-white  ${loading ? "bg-primary/50" : 'bg-primary'}`} > {loading ? "Add..." : "Add customer"} </button>

            </form>
        </div>
    )
}

export default AddNewCustomer
