import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getEmployees, deleteEmployee, updateEmployee, createEmployee } from '../api/employees'; // Ensure these API functions exist
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Ensure AgGrid theme styles are imported
import 'ag-grid-community/styles/ag-grid.css'; // Ensure AgGrid styles are imported
import ActionsRenderer from '../components/EditAddButtons'; // Ensure the path is correct or create the component if it doesn't exist
import { Employee } from '../models/models';
import EditEmployeePopUp from '../components/EditEmployeePopUp';
import AddEmployee from '../components/AddEmployee';

export const EmployeePage = () => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // State to store the selected employee for editing
    
    // get the cafe id from the URL
    const navigate = useNavigate();
    const cafe_id = new URLSearchParams(window.location.search).get('cafe_id');

    const { data: employees = [], refetch } = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {

            const employeesData = await getEmployees(cafe_id || '');
            return employeesData;
        },
    });

    const handleEditClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenEditDialog(true); // Open the edit dialog when the edit button is clicked
    };

    const handleSave = async (updatedEmployee: Employee): Promise<void> => {
        if (!selectedEmployee) {
            console.log(updatedEmployee);
            await createEmployee(updatedEmployee); // Call API to create new employee
        } else {
            setOpenEditDialog(false); // Close the edit dialog
            setSelectedEmployee(null); // Reset the selected employee after saving
            await updateEmployee(updatedEmployee);
        }
        refetch(); // Refetch the list after saving
    };

    const handleDeleteClick = async (employeeId: string) => {
        await deleteEmployee(employeeId); // Call API to delete employee
        refetch(); // Refetch the list after deleting
    };

    const [colDefs] = useState<ColDef[]>([
        { field: 'id', headerName: 'Employee ID' },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email_address', headerName: 'Email Address', flex: 1 },
        { field: 'phone_number', headerName: 'Phone Number', flex: 1 },
        { field: 'days_worked', headerName: 'Days Worked in the Café', flex: 1 },
        { field: 'cafe', headerName: 'Café Name', flex: 1 },
        { field: 'gender', headerName: "Gender", flex: 1},
        {
            headerName: 'Actions',
            cellRenderer: 'actionsRenderer', // Use the custom renderer for Edit/Delete actions
            cellRendererParams: {
                onEditClick: (params: any) => {
                    handleEditClick(params.data); // Open edit dialog
                },
                onDeleteClick: (params: any) => {
                    handleDeleteClick(params.data.id); // Call delete API
                },
            },
        },
    ]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Employees</h1>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setSelectedEmployee(null); // Reset for new employee
                    setOpenAddDialog(true); // Open dialog to add new employee
                }}
                style={{ marginBottom: '20px' }}
            >
                Add New Employee
            </Button>

            <div className="ag-theme-alpine" style={{ width: '100%', height: '600' }}>
                <AgGridReact
                    columnDefs={colDefs}
                    rowData={employees}
                    pagination={true}
                    paginationPageSize={10}
                    components={{
                        actionsRenderer: ActionsRenderer, // Register the custom renderer for actions
                    }}
                    rowHeight={40}
                    domLayout="autoHeight" // Dynamically adjust height to fit content
                    onGridReady={(params) => {
                        params.api.sizeColumnsToFit(); // Automatically fit columns to available width
                    }}
                />
            </div>
            <AddEmployee open={openAddDialog} onClose={() => setOpenAddDialog(false)} onSave={handleSave} />
            <EditEmployeePopUp open={openEditDialog} employee={selectedEmployee} onClose={() => setOpenEditDialog(false)} onSave={handleSave} />
        </div>
    );
};
