import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getTrainings } from "../api";
import type { Training } from "../types";

function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      width: 180,
      valueFormatter: (value) => dayjs(value).format("DD.MM.YYYY HH:mm")
    },
    { field: "duration", headerName: "Duration (min)", width: 150 },
    { field: "activity", headerName: "Activity", width: 200 },
    {
      field: "customer",
      headerName: "Customer",
      width: 200,
      valueGetter: (_value, row) =>
        row.customer ? row.customer.firstname + " " + row.customer.lastname : ""
    },
  ];

  const fetchTrainings = () => {
    getTrainings()
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div style={{ width: "100%", height: 600 }}>
      <h2>Trainings</h2>
      <DataGrid
        rows={trainings}
        columns={columns}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default TrainingList;
