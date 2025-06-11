import { 
  createMovement,
  deleteMovementById,
  getAllMovements,
  getMovementById,
  updateMovementById
} from '../controllers/movementsController.js';

import express from 'express';

const router = express.Router();

router
  .get('/', getAllMovements)
  .get('/:id', getMovementById)
  .post('/', createMovement)
  .put('/:id', updateMovementById)
  .delete('/:id', deleteMovementById);

export {
  router,
};
