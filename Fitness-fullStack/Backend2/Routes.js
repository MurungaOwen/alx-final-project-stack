import express from 'express';
import { RegisterUser, Login } from './Controllers/usersConroller.js';
import { getExercise } from './Controllers/excercisesController.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', Login);
router.get('/categories/bodypart');
router.get('/exercise/:body_part', getExercise);
router.post('/fitness_program');
router.get('/fitness_programs');
router.put('/fitness_program/:program_id');
router.delete('/fitness_program/:program_id');
router.get('/fitness_programs/count');

export default router;