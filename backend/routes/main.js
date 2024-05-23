import express from 'express';
import { RegisterUser, Login, ChangeUserPassword} from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/register', RegisterUser) // register new User
router.post('/login', Login);
router.post('/changepassword', ChangeUserPassword) // change passwd
export default router;