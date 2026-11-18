import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { deleteTraining, getTrainings } from "../api";
import type { Training } from "../types";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) =>
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
    },
  ];

  const fetchTrainings = () => {
    getTrainings()
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      deleteTraining(id)
      .then(() => fetchTrainings())
      .catch(err => console.error(err))
    }
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
