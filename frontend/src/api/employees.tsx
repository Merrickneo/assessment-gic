import axios from 'axios';
import { Employee, UpdateEmployee } from '../models/models';

export const getEmployees = async (cafe_id: string) => {
  const response = await axios.get(`http://127.0.0.1:8000/employees`, { params: { cafe_id: cafe_id } });
  return response.data;
};

export const createEmployee = async (employee: Employee) => {
    console.log(employee);
    const response = await axios.post(`http://127.0.0.1:8000/employee`, employee);
    return response.data;
}

export const updateEmployee = async (employee: UpdateEmployee) => {
    const response = await axios.put(`http://127.0.0.1:8000/employee`, employee);
    return response.data;
}

export const deleteEmployee = async (employeeId: string) => {
    const response = await axios.delete(`http://127.0.0.1:8000/employee`, { params: { employee_id: employeeId } });
    return response.data;
}


