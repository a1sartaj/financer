import React, { useEffect, useState } from 'react'
import Spinner from '../components/ui/Spinner'
import { Customer } from '../types/types'
import axiosInstance from '../api/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/formateDate'
import CustomerProfileUpdate from '../components/CustomerProfileUpdate'
import { Edit, LucideDelete, Trash2 } from 'lucide-react'
import EditEmi from '../components/EditEmi'
import AddSingleEmi from '../components/AddSingleEmi'
import DeleteSingleEmi from '../components/DeleteSingleEmi'
import ConfirmDelete from '../components/ConfirmDelete'
import ConfirmDefaulter from '../components/ConfirmDefaulter'

const CustomerProfile = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [customer, setCustomer] = useState<Customer>()
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const [showDefaulter, setShowDefaulter] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [repaymentId, setRepaymentId] = useState<string>('')
  const [showAddSingleEmi, setShowAddSingleEmi] = useState<boolean>(false)
  const [showSingleEmiDelete, setShowSingleEmiDelete] = useState<boolean>(false)

  const fetchCustomer = async () => {

    try {
      setLoading(true)

      const response = await axiosInstance.get(`/customer/get-single-customer/${id}`)

      setCustomer(response.data.customer)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer();
  }, [])

  const onClose = () => { setShowUpdate(false) }

  if (loading) return <Spinner />

  if (!customer) {
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
    <div className='w-full max-w-6xl mx-auto mb-4' >


      {/* Update card show */}
      {showUpdate && customer && <CustomerProfileUpdate onClose={onClose} customer={customer} fetchCustomer={fetchCustomer} />}


      {/* Confirm Cancel Delete */}
      {showDelete && id && <ConfirmDelete onClose={() => setShowDelete(false)} id={id} />}


      {/* Confirm Defaulter button */}
      {showDefaulter && id && <ConfirmDefaulter onClose={() => setShowDefaulter(false)} id={id} text1={customer.isDefaulter ? "Un Defaulter Confirmation" : "Defaulter Confirmation"} button={customer.isDefaulter ? "Regular" : "Defaulter"} text2={customer.isDefaulter ? "Are you sure you want to make it as regular customer?" : "Are you sure you want to make it defaulter?"} />}


      {/* Add single Emi  */}
      {showAddSingleEmi && id && <AddSingleEmi id={id} onClose={() => setShowAddSingleEmi(false)} fetchCustomer={fetchCustomer} />}


      {/* Show Edit Emi Edit and modify any emis entry */}
      {showEdit && id && <EditEmi id={id} repaymentId={repaymentId} onClose={() => setShowEdit(false)} fetchCustomer={fetchCustomer} />}


      {/* Delete single emi */}
      {showSingleEmiDelete && id && <DeleteSingleEmi repaymentId={repaymentId} onClose={() => setShowSingleEmiDelete(false)} id={id} fetchCustomer={fetchCustomer} />}


      <h1 className='text-primary text-2xl md:text-3xl font-semibold' >Customer Profile </h1>


      {/* Customer details */}
      <div className='p-4 rounded-xl border border-border mt-4 '>

        {/* Customer Info */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background ' >
            <span className='text-sm' >Name</span>
            <h3 className='text-lg  text-black font-medium' >{customer?.name}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Phone</span>
            <h3 className='text-lg  text-black font-medium' >{customer?.phone}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Account No</span>
            <h3 className='text-lg  text-black font-medium' >{customer?.accountNo}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Address</span>
            <h3 className='text-lg  text-black font-medium' >{customer?.address}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Open Date</span>
            <h3 className='text-lg  text-black font-medium' >{formatDate(customer?.openDate as string)}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Close Date</span>
            <h3 className='text-lg  text-black font-medium' >{formatDate(customer?.closeDate as string)}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Emi Count</span>
            <h3 className='text-lg  text-primary font-medium' >{customer?.EMICount}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Emi Amount</span>
            <h3 className='text-lg  text-black font-medium' >₹{customer?.EMIAmount}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Loan Amount</span>
            <h3 className='text-lg  text-black font-medium' >₹{customer?.loanAmount}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >With Interest</span>
            <h3 className='text-lg  text-black font-medium' >₹{customer?.withInterest}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Received</span>
            <h3 className='text-lg  text-secondary font-medium' >₹{customer?.received}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Balance</span>
            <h3 className='text-lg  text-text-red font-medium' >₹{customer?.balance}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Pending</span>
            <h3 className={`text-lg  ${customer && customer?.pendingBalance < 0 ? 'text-text-red' : 'text-secondary'} font-medium`} >₹{customer?.pendingBalance}</h3>
          </div>

          <div className='p-3 rounded-lg text-text-secondary bg-hard-background' >
            <span className='text-sm' >Should Received</span>
            <h3 className='text-lg  text-black font-medium' >₹{customer?.shouldReceive}</h3>
          </div>

        </div>

        {/* Buttons */}
        <div className='mt-4 space-x-4 space-y-4' >
          <button type='button' title='Update' onClick={() => setShowUpdate(true)} className="bg-primary hover:bg-primary/70 cursor-pointer px-3 py-2 rounded-lg text-white text-base " >Update</button>

          <button type='button' title='Delete' onClick={() => setShowDelete(true)} className={`bg-text-red cursor-pointer px-3 py-2 rounded-lg text-white text-base`} >Delete</button>

          <button type='button' title='Defaulter' onClick={() => setShowDefaulter(true)} className="bg-warning hover:bg-warning/70 cursor-pointer px-3 py-2 rounded-lg text-white text-base " >{customer.isDefaulter ? "Mark as Regular" : "Mark as Defaulter"}</button>

          <button type='button' title='Defaulter' onClick={() => setShowAddSingleEmi(true)} className="bg-secondary hover:bg-secondary/70 cursor-pointer px-3 py-2 rounded-lg text-white text-base " >Add Emi</button>
        </div>

      </div>



      {/* Emi History list */}
      <h1 className='text-primary text-2xl md:text-3xl font-semibold mt-4' >EMI History</h1>

      {/* View All Emi List */}
      <div className=' mt-4 border border-border rounded-md overflow-hidden'>
        <table className='w-full text-base text-text-secondary text-left'>
          <thead>
            <tr className='bg-hard-background'>
              <th className='  p-2'>No</th>
              <th className=' p-2'>Date</th>
              <th className=' p-2'>Amount</th>
              <th className=' p-2'>Action</th>
            </tr>
          </thead>

          <tbody  >
            {
              customer?.loanRepayment.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((emi, index) => (
                <tr key={index} className='border-t text-base text-text-primary border-border' >
                  <td className="p-2"> {customer.loanRepayment.length - index} </td>
                  <td className=" p-2">{formatDate(emi.date)}</td>
                  <td className=" p-2"> {emi.emiReceived} </td>
                  <td className="flex  items-center gap-2 p-2 text-white">
                    <button type='button' onClick={() => {
                      setShowEdit(true)
                      if (emi._id) {
                        setRepaymentId(emi._id)
                      }
                    }} className={`bg-primary p-1 md:px-3 md:py-.5 rounded-lg flex items-center gap-2`} > <Edit /> <span className='hidden md:inline' >Edit</span> </button>

                    <button
                      type='button'
                      className='bg-text-red p-1 md:px-3 md:py-.5 rounded-lg flex gap-2 items-center'
                      onClick={() => {
                        setShowSingleEmiDelete(true)
                        if (emi._id) {
                          setRepaymentId(emi._id)
                        }
                      }}
                    >
                      <Trash2 /> <span className='hidden md:inline' >Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
export default CustomerProfile
