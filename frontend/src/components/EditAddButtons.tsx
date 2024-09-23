import React from 'react';
import { Button } from '@mui/material';

const ActionsRenderer = (props: any) => {
    const handleEditClick = () => {
        if (props.onEditClick) {
            props.onEditClick(props); // Pass the params when Edit is clicked
        }
    };

    const handleDeleteClick = () => {
        if (props.onDeleteClick) {
            props.onDeleteClick(props); // Pass the params when Delete is clicked
        }
    };

    return (
        <span>
            <Button 
                variant="contained" 
                color="primary" 
                size="small" 
                style={{ marginRight: '5px' }}
                onClick={handleEditClick}
            >
                Edit
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                size="small" 
                onClick={handleDeleteClick}
            >
                Delete
            </Button>
        </span>
    );
};

export default ActionsRenderer;
