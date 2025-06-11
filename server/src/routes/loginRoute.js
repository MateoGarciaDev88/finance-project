import { login } from '../controllers/loginController.js';
import express from 'express';

const router = express.Router();

router
  .post('/', login );
  // .get('/', (req, res) => {
  //   res.send('Sing Up Route');
  // });

export {
  router,
};