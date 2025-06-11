import { 
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById
} from '../controllers/categoriesController.js';

import express from 'express';

const router = express.Router();

router
  .get('/', getAllCategories)
  .get('/:id', getCategoryById)
  .post('/', createCategory)
  .put('/:id', updateCategoryById)
  .delete('/:id', deleteCategoryById);

export { 
  router,
};
