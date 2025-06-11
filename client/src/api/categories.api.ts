import { financeApi } from './config';

const getCategories = async () => {
  const response = await financeApi.get('/categories');
  console.log('🚀 ~ response:', response);
  // return response.data;
}

const createCategoryRequest = async ( category ) => {
  const response = await financeApi.post('/categories', category);
  console.log(response);
}
// getCategories()

export {
  getCategories,
  createCategoryRequest,
}