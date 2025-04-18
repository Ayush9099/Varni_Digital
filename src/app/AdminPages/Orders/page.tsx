'use client';

import TitleElement from "~/app/_components/Elements/TitleElement";
import TableElement from "~/app/_components/Elements/TableElement";
import { GridColDef } from '@mui/x-data-grid';
import { Divider } from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

// Define your row data
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 53 },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 23 },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 59 },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 69 },
];

interface OrdersProps {

}

const Orders: React.FC<OrdersProps> = ({ }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
                <TitleElement title={'Orders'} />
            </div>
            <Divider sx={{ marginLeft: '1rem', width: "30%" }} />
            <div className="m-5">
                <TableElement
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                    initialPaginationModel={{ pageSize: 5 }}
                />
            </div>
        </>
    )
}
export default Orders;