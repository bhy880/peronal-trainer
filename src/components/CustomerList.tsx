import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { deleteCustomer, getCustomers } from "../api";
import type { Customer } from "../types";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 120 },
    { field: "lastname", headerName: "Last name", width: 150 },
    { field: "streetaddress", headerName: "Street address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "addTraining",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        <AddTraining customer={params.row} />
    },
    {
      field: "edit",
      headerName: "",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        <EditCustomer customerData={params.row} fetchCustomers={fetchCustomers} />
    },
    {
      field: '_links.self.href',
      headerName: ' ',
      renderCell: (params: GridRenderCellParams) =>
        <IconButton onClick={() => handleDelete(params.row._links!.self.href)}>
          <DeleteIcon color="error" />
        </IconButton>
    }
  ];

  const fetchCustomers = () => {
    getCustomers()
    .then(data => setCustomers(data._embedded.customers))
    .catch(err => console.error(err))
  }

  const handleDelete = (url: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(url)
      .then(() => fetchCustomers())
      .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ width: "100%", height: 600 }}>
      <h2>Customers</h2>
      <AddCustomer fetchCustomers= {fetchCustomers} />
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={row => row._links!.self.href}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default CustomerList;