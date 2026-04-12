import express from 'express';
import { getMe, loginFinancer, logoutFinancer } from '../controllers/financer.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const financerRouter = express.Router();

financerRouter.post('/login', loginFinancer)
financerRouter.post('/logout', logoutFinancer)
financerRouter.get('/get-me', protectedRoute, getMe)


//This Routes is being used by adming that's why we need to protect route for access unauthorized
// financerRouter.post('/register', adminAuthorized, createFinancer)
// financerRouter.get('/get-all-financer', adminAuthorized, getAllFinancer )

export default financerRouter;