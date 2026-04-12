import mongoose, { Schema } from "mongoose";

interface ILoanRepayment {
    _id?: mongoose.Types.ObjectId,
    date: Date
    emiReceived: number
}

interface ICustomer {
    financerId: mongoose.Types.ObjectId
    name: string
    phone: string
    address: string
    openDate: Date
    closeDate: Date
    accountNo: string
    EMICount: number
    EMIAmount: number
    loanAmount: number
    withInterest: number
    balance: number
    received: number
    shouldReceive: number
    pendingBalance: number
    loanRepayment: ILoanRepayment[]
    isDefaulter: boolean
    deletedAt: Date | null
}

const loanRepaymentSchema = new Schema<ILoanRepayment>({
    date: { type: Date, required: true },
    emiReceived: { type: Number, required: true }
})

const customerSchema = new Schema<ICustomer>({
    financerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Financer', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, minlength: 10, match: /^[0-9]{10}$/ },
    address: { type: String, required: true },
    openDate: { type: Date, required: true },
    closeDate: { type: Date, required: true },
    accountNo: { type: String, required: true, unique: true },
    EMICount: { type: Number, default: 0 },
    EMIAmount: { type: Number, required: true },
    loanAmount: { type: Number, required: true },
    withInterest: { type: Number, required: true },
    received: { type: Number, default: 0 },
    balance: { type: Number, required: true },
    shouldReceive: { type: Number, default: 0 },
    pendingBalance: { type: Number, default: 0 },
    loanRepayment: { type: [loanRepaymentSchema], default: [] },
    isDefaulter: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
}, { timestamps: true })


const customerModal = mongoose.model<ICustomer>('Customer', customerSchema)

export default customerModal;