import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, TextField, Button, DialogTitle } from '@mui/material';
import { Employee } from '../models/models';

interface AddEmployeeProps {
    open: boolean;
    onClose: () => void;
    onSave: (employee: Employee) => Promise<void>;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState<Employee>({
        id: '',
        name: '',
        email_address: '',
        phone_number: '',
        cafe: '',
        cafe_id: '',
        days_worked: 0,
        gender: '',
        start_date: new Date()
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData); // Call the onSave function with the updated data
    };

    return (

        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <TextField
                    label="Employee ID"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Café Name"
                    name="cafe"
                    value={formData.cafe}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Café ID"
                    name="cafe_id"
                    value={formData.cafe_id}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEmployee;