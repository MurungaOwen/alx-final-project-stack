import express from 'express';
import { RegisterUser, Login, ChangeUserPassword} from '../controllers/usersControllers.js';
import { generateToken, handleStkPush, processPayment } from '../controllers/paymentController.js';
const router = express.Router();

router.post('/register', RegisterUser) // register new User
router.post('/login', Login)
router.post('/changepassword', ChangeUserPassword) // change passwd
router.post('/pay', generateToken, handleStkPush) // generate token then push stk
router.post('/processpayment', processPayment)

export default router;