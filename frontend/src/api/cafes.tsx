// src/api/cafes.ts
import axios from 'axios';
import { Cafe } from '../models/models';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getCafes = async (location: string): Promise<Cafe[]> => {
    const response = await axios.get(`${API_BASE_URL}/cafes`, {
        params: { location },
    });
    return response.data;
};

export const createCafe = async (cafe: Cafe): Promise<Cafe> => {
    const response = await axios.post(`${API_BASE_URL}/cafe`, cafe);
    return response.data;
}

export const updateCafe = async (cafe: Cafe): Promise<Cafe> => {
    const response = await axios.put(`${API_BASE_URL}/cafe`, cafe);
    return response.data;
}

export const deleteCafe = async (cafe_id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/cafe`, {
        params: { cafe_id: cafe_id }
    });
}




