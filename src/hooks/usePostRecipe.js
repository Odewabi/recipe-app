import { useState } from 'react';
import axios from 'axios';

const API_URL = `https://recipe-app-d5398-default-rtdb.firebaseio.com/.json`;

const usePostRecipe = () => {
  const [loading, setLoading] = useState(false);

  const addRecipe = async (recipe) => {
    setLoading(true);
    try {
      await axios.post(API_URL, recipe);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
    setLoading(false);
  };

  return { addRecipe, loading };
};

export default usePostRecipe;
