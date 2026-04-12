import type { Request, Response } from "express";
import customerModal from "../models/customer.model.js";


export const getAllCustomers = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;

        const customers = await customerModal.find({ financerId: userId, isDefaulter: false, deletedAt: null }).sort({ name: 1 })

        if (customers.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        return res.status(200).json({ success: true, message: 'Successfully fetch all customer', customers })

    } catch (error) {
        console.error(error)

        return res.status(500).json({ success: false, message: 'Failed to fetch all users' })
    }

}

export const addNewCustomer = async (req: Request, res: Response) => {
    const { name, phone, address, openDate, closeDate, accountNo, loanAmount } = req.body;

    const userId = (req as any).userId;

    if (!name || !phone || !address || !openDate || !closeDate || !accountNo || !loanAmount) {
        return res.status(400).json({ success: false, message: 'All Fields are required' })
    }

    try {
        const customer = await customerModal.findOne({ accountNo })

        if (customer) {
            return res.status(409).json({ success: false, message: 'Use unique Account no' })
        }

        const newOpenDate: Date = new Date(openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const newCloseDate: Date = new Date(closeDate)
        newCloseDate.setUTCHours(0, 0, 0, 0)

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);
        const emiAmount = loanAmount / 100;
        const withInterest = emiAmount * 120;
        const shouldReceive = emiAmount * emiCount;
        const pendingBalance = -(emiCount * emiAmount)

        const newCustomer = await customerModal.create({
            financerId: userId,
            name,
            phone,
            address,
            openDate: newOpenDate,
            closeDate: newCloseDate,
            accountNo,
            EMICount: emiCount,
            EMIAmount: emiAmount,
            loanAmount,
            withInterest,
            balance: withInterest,
            shouldReceive,
            pendingBalance,
        })


        res.status(201).json({ success: true, message: 'Customer Add successfully', newCustomer })
    } catch (error) {

        console.error(error)
        return res.status(500).json({ success: false, message: 'Server error' })
    }
}

export const getSingleCustomers = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const customer = await customerModal.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const newOpenDate: Date = new Date(customer.openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);

        customer.EMICount = emiCount;

        customer.shouldReceive = Math.min(customer.EMICount * customer.EMIAmount, customer.withInterest);

        customer.pendingBalance = customer.received - customer.shouldReceive;

        await customer.save();

        return res.status(200).json({ success: true, customer })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch single customer" })
    }
}

export const updateCustomerProfile = async (req: Request, res: Response) => {
    const { name, phone, address, openDate, closeDate, loanAmount } = req.body;
    const { id } = req.params;

    if (!name || !phone || !address || !openDate || !closeDate || !loanAmount) {
        return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    try {
        const customer = await customerModal.findById(id);

        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        const newOpenDate: Date = new Date(openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const newCloseDate: Date = new Date(closeDate)
        newCloseDate.setUTCHours(0, 0, 0, 0)

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);
        const emiAmount = loanAmount / 100;
        const withInterest = emiAmount * 120;
        const shouldReceive = emiAmount * emiCount;
        const pendingBalance = customer.received - shouldReceive;


        customer.name = name;
        customer.phone = phone;
        customer.address = address;
        customer.openDate = newOpenDate;
        customer.closeDate = newCloseDate;
        customer.EMICount = emiCount;
        customer.EMIAmount = emiAmount;
        customer.loanAmount = loanAmount;
        customer.withInterest = withInterest;
        customer.balance = withInterest - customer.received;
        customer.shouldReceive = shouldReceive;
        customer.pendingBalance = pendingBalance;

        await customer.save();

        return res.status(200).json({ success: true, message: 'Customer update Successfully' })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Failed to update customer' })
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await customerModal.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        customer.deletedAt = new Date();

        await customer.save();

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete customer",
        });
    }
};

export const makeDefaulterCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customer = await customerModal.findById(id)
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }
        customer.isDefaulter = !customer.isDefaulter;

        let message: string;

        if (customer.isDefaulter) {
            message = "Successfully made defaulter"
        } else {
            message = "Successfully remove from defaulter list"
        }

        await customer.save();

        return res.status(200).json({ success: false, message })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Failed to make defaulter' })
    }
}

export const getAllBinCustomers = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;

        const customers = await customerModal.find({ financerId: userId, deletedAt: { $ne: null } }).sort({ name: 1 })

        if (customers.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        return res.status(200).json({ success: true, message: 'Successfully fetch all customer', customers })

    } catch (error) {
        console.error(error)

        return res.status(500).json({ success: false, message: 'Failed to fetch all users' })
    }

}

export const restoreCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await customerModal.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        customer.deletedAt = null;

        await customer.save();

        return res.status(200).json({
            success: true,
            message: "Customer restored successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to restore customer",
        });
    }
};

export const getAllDefaulterCustomers = async (req: Request, res: Response) => {
    try {

        const userId = (req as any).userId;

        const customers = await customerModal.find({ financerId: userId, isDefaulter: true, deletedAt: null }).sort({ name: 1 })

        if (customers.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        return res.status(200).json({ success: true, message: 'Successfully fetch all customer', customers })

    } catch (error) {
        console.error(error)

        return res.status(500).json({ success: false, message: 'Failed to fetch all users' })
    }

}




export const addEmiForAllCustomer = async (req: Request, res: Response) => {

    interface AllEmiArray {
        customerId: string;
        emiReceived: number;
    }

    const allCustomersEmiArray = req.body as AllEmiArray[];


    if (!allCustomersEmiArray || !Array.isArray(allCustomersEmiArray) || allCustomersEmiArray.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid EMI data provided" });
    }

    try {


        for (const item of allCustomersEmiArray) {
            const { customerId, emiReceived } = item;

            if (emiReceived < 0) {
                return res.status(400).json({ success: false, message: 'Emi Amount cannot be negetive' })
            }

            const customer = await customerModal.findById(customerId);
            if (!customer) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }

            const currentDate: Date = new Date();
            currentDate.setUTCHours(0, 0, 0, 0);



            customer.loanRepayment.push({ emiReceived, date: currentDate })

            const newOpenDate: Date = new Date(customer.openDate)
            newOpenDate.setUTCHours(0, 0, 0, 0);

            const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);
            customer.EMICount = emiCount;
            customer.balance = customer.balance - emiReceived;
            customer.received = customer.received + emiReceived;
            customer.shouldReceive = Math.min(customer.EMICount * customer.EMIAmount, customer.withInterest);
            customer.pendingBalance = customer.received - customer.shouldReceive;

            await customer.save();

        }


        return res.status(201).json({ success: true, message: "EMI added successfully for all customers" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateSingleEmi = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newAmount, repaymentId } = req.body;

    if (newAmount == null || !repaymentId) {
        return res.status(400).json({ success: false, message: 'Please enter EMI Amount' });
    }

    if (newAmount < 0) {
        return res.status(400).json({ success: false, message: 'Emi amount cannot be negitive' });
    }

    try {

        const customer = await customerModal.findById(id)
        if (!customer) {
            return res.status(400).json({ success: false, message: 'Customer not found' })
        }

        const repayment = customer.loanRepayment.find((item) => item._id?.toString() === repaymentId);

        if (!repayment) {
            return res.status(404).json({ success: false, message: 'Emi not found' })
        }

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const newOpenDate: Date = new Date(customer.openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);

        customer.EMICount = emiCount;

        const previousEmi = repayment.emiReceived;
        repayment.emiReceived = newAmount;

        customer.received = customer.received - previousEmi + newAmount;
        customer.balance = customer.balance + previousEmi - newAmount;
        customer.shouldReceive = Math.min(customer.EMICount * customer.EMIAmount, customer.withInterest);
        customer.pendingBalance = customer.received - customer.shouldReceive;

        await customer.save();

        return res.status(200).json({ success: true, message: "Successfully update emi" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Failed to update emi' })
    }
}

export const addSingleCustomerEmi = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { emiReceived, date } = req.body;




    if (!emiReceived || !date) {
        return res.status(400).json({ success: false, message: 'Please Fill Emi Field' })
    }

    if (emiReceived < 0) {
        return res.status(400).json({ success: false, message: 'Emi amount cannot be negetive' })
    }

    try {
        const customer = await customerModal.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const onlyDate: Date = new Date(date);
        onlyDate.setUTCHours(0, 0, 0, 0);


        customer.loanRepayment.push({ emiReceived, date: onlyDate });

        const newOpenDate: Date = new Date(customer.openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);

        customer.EMICount = emiCount;
        customer.balance = customer.balance - emiReceived;
        customer.received = customer.received + Number(emiReceived);
        customer.shouldReceive = Math.min(customer.EMICount * customer.EMIAmount, customer.withInterest);
        customer.pendingBalance = customer.received - customer.shouldReceive;

        await customer.save();

        return res.status(200).json({ success: true, message: 'Single Emi Added successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: 'Failed to added customer emi' })
    }
}


export const DeleteSinglEmiFromCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { repaymentId } = req.body;

    if (!repaymentId) {
        return res.status(400).json("Please provide emi id")
    }

    try {

        const customer = await customerModal.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' })
        }

        const repayment = customer.loanRepayment.find((item) => item._id?.toString() === repaymentId);
        if (!repayment) {
            return res.status(404).json({ success: false, message: 'Emi not found' })
        }

        const currentDate: Date = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);

        const newOpenDate: Date = new Date(customer.openDate)
        newOpenDate.setUTCHours(0, 0, 0, 0);

        const emiCount: number = (currentDate.getTime() - newOpenDate.getTime()) / (24 * 60 * 60 * 1000);
        customer.EMICount = emiCount;

        const previousEmi = repayment.emiReceived;

        customer.received = customer.received - previousEmi;
        customer.balance = customer.balance + previousEmi;
        customer.shouldReceive = Math.min(customer.EMICount * customer.EMIAmount, customer.withInterest);
        customer.pendingBalance = customer.received - customer.shouldReceive;
        customer.loanRepayment = customer.loanRepayment.filter(emi => emi._id?.toString() != repaymentId);

        await customer.save();

        return res.status(200).json({ success: true, message: "Successfully sing emi deleted" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Failed to delete single EMi" })
    }

}


