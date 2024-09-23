import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Radio } from '@mui/material';
import { Employee } from '../models/models';

interface EditEmployeePopupProps {
    employee: Employee | null;
    open: boolean;
    onClose: () => void;
    onSave: any;
}

const EditEmployeePopUp: React.FC<EditEmployeePopupProps> = ({ employee, open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email_address: '',
        phone_number: '',
        cafe_id: '',
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee); // Set the form data to the selected employee's details
        } else {
            setFormData({ name: '', email_address: '', phone_number: '',  cafe_id: '' }); // Reset form for new employee
        }
    }, [employee]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData); // Call the onSave function with the updated data
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{employee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            <DialogContent>
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
                    label="Café ID"
                    name="cafe_id"
                    value={formData.cafe_id}
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

export default EditEmployeePopUp;