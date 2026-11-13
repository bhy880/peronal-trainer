import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { getCustomers } from "../api";
import type { Customer } from "../types";

function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 150 },
    { field: "lastname", headerName: "Last name", width: 150 },
    { field: "streetaddress", headerName: "Street address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone", headerName: "Phone", width: 150 },
  ];

  const fetchCustomers = () => {
    getCustomers()
    .then(data => setCustomers(data._embedded.customers))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ width: "100%", height: 600 }}>
      <h2>Customers</h2>
      <DataGrid
        rows={customers}
        columns={columns}
        getRowId={row => row._links.self.href}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default CustomerList;