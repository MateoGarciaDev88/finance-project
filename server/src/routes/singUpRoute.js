import { singUp } from '../controllers/singUpController.js';
import express from 'express';

const router = express.Router();

router
  .post('/', singUp );
  // .get('/', (req, res) => {
  //   res.send('Sing Up Route');
  // });

export {
  router,
};