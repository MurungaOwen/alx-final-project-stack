import express from 'express';
import { RegisterUser, Login, ChangeUserPassword} from '../controllers/usersControllers.js';
import { createProperty, getAllProperties, getPropertyById,updateProperty,deleteProperty } from '../controllers/propertyController.js';
import { createRental, getAllRentals, getRentalById, updateRental, deleteRental } from '../controllers/rentalController.js';
import { generateToken, handleStkPush, processPayment } from '../controllers/paymentController.js';


const router = express.Router();

router.post('/register', RegisterUser) // register new User
router.post('/login', Login);
router.post('/changepassword', ChangeUserPassword) // change passwd


// Property routes
router.post('/api/properties', createProperty);
router.get('/api/properties', getAllProperties);
router.get('/api/properties/:propertyId', getPropertyById);
router.put('/api/properties/:propertyId', updateProperty);
router.delete('/api/properties/:propertyId', deleteProperty);

// Rental routes
router.post('/api/rentals', createRental);
router.get('/api/rentals', getAllRentals);
router.get('/api/rentals/:rentalId', getRentalById);
router.put('/api/rentals/:rentalId', updateRental);
router.delete('/api/rentals/:rentalId', deleteRental);

// payment routes
router.post('/api/pay', generateToken, handleStkPush); // generate token then push stk
router.post('/api/pay/process', processPayment);

export default router;