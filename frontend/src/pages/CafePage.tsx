import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getCafes, createCafe, updateCafe, deleteCafe } from '../api/cafes';
import { getEmployees } from '../api/employees';
import { Cafe } from '../models/models';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Ensure AgGrid theme styles are imported
import 'ag-grid-community/styles/ag-grid.css'; // Ensure AgGrid styles are imported
import 'ag-grid-community/styles/ag-theme-balham.css'; // Ensure AgGrid theme styles are imported
import EditCafeDialog from '../components/EditCafePopUp';
import ActionsRenderer from '../components/EditAddButtons';

export const CafePage = () => {
    const navigate = useNavigate();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleEmployeeClick = (cafeId: string) => {
        navigate(`/employees?cafe_id=${cafeId}`);
    };

    const handleEditClick = (cafe: Cafe) => {
        setSelectedCafe(cafe);
        setOpenEditDialog(true);
    }

    const handleSave = async (updatedCafe: Cafe) => {
        if (!isEdit) {
            // Call API to create new cafe
            console.log(updatedCafe);
            await createCafe(updatedCafe);
        } else {
            await updateCafe(updatedCafe);
        }
        // Call API to update cafe
        setSelectedCafe(null);
        setOpenEditDialog(false);
        setIsEdit(false);
        refetch(); // Refetch the cafe list after saving
    };

    const [rowData, setRowData] = useState<Cafe[]>([]);
    const [colDefs] = useState<ColDef<Cafe>[]>([
        { field: "name", headerName: "Name" },
        { field: "description", headerName: "Description" },
        { field: "id", headerName: "ID" },
        {
            field: "employeeCount",
            headerName: "Employees",
            cellRenderer: (params: { value: any; }) => params.value,
            onCellClicked: (params) => {
                if (params.data) {
                    handleEmployeeClick(params.data.id);
                }
            },
        },
        { field: "location", headerName: "Location", filter: true },
        {
            headerName: 'Actions',
            cellRenderer: 'actionsRenderer',  // Use the custom renderer
            cellRendererParams: {
                onEditClick: (params: any) => {
                    setIsEdit(true);
                    setSelectedCafe(params.data);  // Set the selected cafe
                    handleEditClick(params.data);  // Open edit dialog
                },
                onDeleteClick: async (params: any) => {
                    await deleteCafe(params.data.id);  // Add API call to delete the cafe
                    refetch();  // Refetch the updated list
                },
            },
        },
    ]);

    // Fetch cafes from the API with optional location filtering
    const { data: cafes, refetch } = useQuery({ // eslint-disable-line
        queryKey: ['cafes', ''],
        queryFn: async () => {
            const fetchedCafes = await getCafes('');
            const cafeData = await Promise.all(fetchedCafes.map(async (cafe) => {
                const employees = await getEmployees(cafe.id);
                const employeeCount = employees.length;
                return { ...cafe, employeeCount };
            }));

            setRowData(cafeData); // Set the API data to rowData
            return cafeData;
        },
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cafes</h1>
            <div style={{ marginBottom: '20px' }}>
                <Button variant="contained" color="secondary" onClick={() => {
                    setSelectedCafe({ id: '', _id: '', name: '', description: '', location: '', logo: '', employeeCount: 0 });
                    setOpenEditDialog(true);
                }} style={{ marginLeft: '10px' }}>
                    Add New Café
                </Button>
            </div>

            <div className="ag-theme-alpine" style={{ width: '100%', height: '600' }}>
                <AgGridReact
                    columnDefs={colDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    components={{
                        actionsRenderer: ActionsRenderer,  // Register the custom component
                    }}
                    rowHeight={40}
                    domLayout="autoHeight" // Dynamically adjust height to fit content
                    onGridReady={(params) => {
                        params.api.sizeColumnsToFit(); // Automatically fit columns to available width
                    }}
                />
            </div>
            <EditCafeDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} onSave={handleSave} cafe={selectedCafe} isEdit={isEdit}/>
        </div>
    );
};
