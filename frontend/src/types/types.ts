


// ========== Login Input Data ==========
export interface LoginInput {
    email: string
    password: string
}

// ========== AuthContext ==========
export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    handleLogout: () => void;
}

export interface InputForm {
    name: string;
    phone: string;
    address: string;
    openDate: string;
    accountNo?: string;
    loanAmount: number;
}


export interface LoanRepayment {
    _id?: string;
    date: string; // ISO string from backend
    emiReceived: number;
}

export interface Customer {
    _id: string;
    financerId: string;

    name: string;
    phone: string;
    address: string;
    accountNo: string;

    openDate: string;
    closeDate: string;

    loanAmount: number;
    EMIAmount: number;
    EMICount: number;

    withInterest: number;
    balance: number;

    received: number;
    shouldReceive: number;
    pendingBalance: number;

    loanRepayment: LoanRepayment[];

    isDefaulter: boolean;
    deletedAt : Date | null;

    createdAt: string;
    updatedAt: string;

    __v: number;
}