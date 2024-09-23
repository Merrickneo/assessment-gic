import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Cafe } from '../models/models';

interface EditCafeDialogProps {
    cafe: Cafe | null;
    open: boolean;
    onClose: () => void;
    onSave: (updatedCafe: Cafe) => void;
    isEdit: boolean;
}

const EditCafeDialog: React.FC<EditCafeDialogProps> = ({ cafe, open, onClose, onSave, isEdit }) => {
    const [formData, setFormData] = useState<Cafe>({ id: '', _id: '', name: '', description: '', logo: '', location: '', employeeCount: 0 });

    // Update the formData when the dialog opens or cafe changes
    useEffect(() => {
        if (cafe) {
            setFormData(cafe);
        }
    }, [cafe]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>'Edit Café Details'</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}  // Controlled by formData
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}  // Controlled by formData
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}  // Controlled by formData
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="ID"
                    name="id"
                    value={formData.id}  // Controlled by formData
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                {/* Add other fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCafeDialog;
