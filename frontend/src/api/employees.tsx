import axios from 'axios';
import { Employee, UpdateEmployee } from '../models/models';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getEmployees = async (cafe_id: string) => {
    console.log(API_BASE_URL);
    const response = await axios.get(`${API_BASE_URL}/employees`, { params: { cafe_id: cafe_id } });
    return response.data;
};

export const createEmployee = async (employee: Employee) => {
        console.log(employee);
        const response = await axios.post(`${API_BASE_URL}/employee`, employee);
        return response.data;
}

export const updateEmployee = async (employee: UpdateEmployee) => {
        const response = await axios.put(`${API_BASE_URL}/employee`, employee);
        return response.data;
}

export const deleteEmployee = async (employeeId: string) => {
        const response = await axios.delete(`${API_BASE_URL}/employee`, { params: { employee_id: employeeId } });
        return response.data;
}


