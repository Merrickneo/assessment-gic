// src/api/cafes.ts
import axios from 'axios';
import { Cafe, Employee } from '../models/models';

export const getCafes = async (location: string): Promise<Cafe[]> => {
  const response = await axios.get('http://127.0.0.1:8000/cafes', {
    params: { location },
  });
  return response.data;
};

export const createCafe = async (cafe: Cafe): Promise<Cafe> => {
    const response = await axios.post('http://127.0.0.1:8000/cafe', cafe);
    return response.data;
}

export const updateCafe = async (cafe: Cafe): Promise<Cafe> => {
    const response = await axios.put('http://127.0.0.1:8000/cafe', cafe);
    return response.data;
}

export const deleteCafe = async (cafe_id: string): Promise<void> => {
    await axios.delete('http://127.0.0.1:8000/cafe', {
        params: {cafe_id: cafe_id}
    });
}




