import { useEffect, useState } from "react";
import { Customer } from "../types/types";
import axiosInstance from "../api/axiosInstance";
import { formatDate } from "../utils/formateDate";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";

interface EmiPayload {
    customerId: string;
    emiReceived: number;
}

const CustomerEmiEntry = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [loading2, setLoading2] = useState<boolean>(false)
    const [customers, setCustomers] = useState<Customer[] | []>([])
    const [emiInput, setEmiInput] = useState<Record<string, number | ''>>({})
    const [total, setTotal] = useState<number>(0)

    const fetchCustomers = async () => {

        try {
            // setLoading(true)

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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setEmiInput(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        const payload: EmiPayload[] = Object.entries(emiInput).map(([customerId, emiReceived]) => ({
            customerId,
            emiReceived: emiReceived === "" ? 0 : emiReceived
        }));

        try {

            setLoading2(true)

            const response = await axiosInstance.put(`/customer/add-all-customer-emi`, payload)

            toast.success("Successfully Update all EMIs")
            setEmiInput({})
            fetchCustomers()

        } catch (error) {
            console.error(error)
        } finally {
            setLoading2(false)
        }


    }

    useEffect(() => {
        const totalAmount = Object.values(emiInput).reduce<number>((sum, val) => sum + (typeof val === "number" ? val : 0), 0);

        setTotal(totalAmount);
    }, [emiInput]);


    if (loading) return <Spinner />

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-6xl mx-auto mb-4' >
            <h1 className='text-primary text-2xl md:text-3xl font-semibold ' >Customer Emi Entry</h1>

            {/* It show on Desktop mode */}
            <div className='mt-4 border border-border rounded-md overflow-x-auto' >
                <table className='w-full text-base text-text-secondary text-left'>
                    <thead className="w-full" >
                        <tr className='bg-hard-background w-full'>
                            <th className='  p-2'>No</th>
                            <th className='  p-2'>Name</th>
                            <th className='  p-2'>EMI</th>
                            <th className='  p-2'>Amount</th>
                            <th className=' p-2'>OpenDate</th>
                            <th className=' p-2'>CloseDate</th>
                            <th className=' p-2'>Pending</th>
                            <th className=' p-2'>Balance</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {customers.map((customer: Customer, index) => (

                            <tr key={index} className='border-t text-text-primary border-border' >
                                <td className="p-2 "> {index + 1} </td>
                                <td className="p-2 "> {customer.name} </td>
                                <td className="p-2 "> {customer.EMIAmount} </td>
                                <td className="p-2">

                                    <input
                                        type="number"
                                        required
                                        className="w-full px-2 rounded-md text-black border-border outline-primary border placeholder:text-base"
                                        placeholder="Amt"
                                        onChange={handleOnChange}
                                        name={customer._id}
                                        value={emiInput[customer._id] ?? ''}
                                        min={0}
                                    />

                                </td>
                                <td className=" p-2">{formatDate(customer.openDate)}</td>
                                <td className=" p-2">{formatDate(customer.closeDate)}</td>
                                <td className={`p-2 font-medium ${customer && customer?.pendingBalance < 0 ? 'text-text-red' : 'text-secondary'}`}>₹{customer.pendingBalance}</td>
                                <td className={`p-2 font-medium text-black`}>₹{customer.balance}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
            <button disabled={loading2} type="submit" className="px-4 py-2 rounded-lg text-white bg-primary mt-4" >{loading2 ? "Submiting..." : "Submit"} {total}</button>
        </form>
    );
};

export default CustomerEmiEntry;