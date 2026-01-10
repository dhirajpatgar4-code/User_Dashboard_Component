import axios from 'axios';
// 1. Define the base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// 2. Construct the full API URL
const API_URL = `${BASE_URL}/api/counsellor/getrandomcounsellor`;

export const getRandomCounsellors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Axios fetch error:", error);
    throw error;
  }
};