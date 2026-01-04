import { asyncHandler } from '../utils/async-handler';
import api from './apiClient';

export const createOrder = asyncHandler(async (amount) => {
  const res = await api.post('/api/create-order', {
    currency: 'INR',
    amount: Number(amount),
  });
  return res?.data?.data?.id;
});

export const getKeys = asyncHandler(async () => {
  const res = await api.get('/api/get-payment-keys');
  return res;
});
