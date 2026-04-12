import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { addEmiForAllCustomer, addNewCustomer, getAllCustomers, getSingleCustomers, updateSingleEmi, addSingleCustomerEmi, DeleteSinglEmiFromCustomer, updateCustomerProfile, makeDefaulterCustomer, getAllBinCustomers, deleteCustomer, restoreCustomer, getAllDefaulterCustomers } from '../controllers/customer.controller.js';

const router = express.Router();


router.get('/get-all-customer', protectedRoute, getAllCustomers)
router.post('/add-new-customer', protectedRoute, addNewCustomer)
router.get('/get-single-customer/:id', protectedRoute, getSingleCustomers)
router.put('/update-customer-profile/:id', protectedRoute, updateCustomerProfile)
router.put('/delete-customer/:id', protectedRoute, deleteCustomer)
router.put('/make-defaulter-customer/:id', protectedRoute, makeDefaulterCustomer)
router.get('/get-all-defaulter-customer', protectedRoute, getAllDefaulterCustomers)
router.get('/get-all-bin-customer', protectedRoute, getAllBinCustomers)
router.delete('/restore-customer/:id', protectedRoute, restoreCustomer)

router.put('/add-all-customer-emi', protectedRoute, addEmiForAllCustomer)
router.put('/update-single-emi/:id', protectedRoute, updateSingleEmi)
router.put('/add-single-emi-for-customer/:id', protectedRoute, addSingleCustomerEmi)
router.put('/delete-single-emi-from-customer/:id', protectedRoute, DeleteSinglEmiFromCustomer)




export default router; 