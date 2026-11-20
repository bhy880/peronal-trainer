import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import type { Customer } from "../types";
import { addTraining } from "../api";

type AddTrainingProps = {
  customer: Customer;
};

export default function AddTraining({ customer }: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");

  const handleClickOpen = () => {
    setDate(dayjs());
    setActivity("");
    setDuration("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!date) return;

    addTraining({
      date: date.toISOString(),
      activity: activity,
      duration: Number(duration),
      customer: customer._links!.self.href,
    })
      .catch(err => console.error(err));
    handleClose();
  };

  const isValid = date !== null && activity.trim() !== "" && Number(duration) > 0;

  return (
    <>
      <Tooltip title="Add training">
        <IconButton onClick={handleClickOpen}>
          <FitnessCenterIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New training for {customer.firstname} {customer.lastname}
        </DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Date and time"
            value={date}
            onChange={newValue => setDate(newValue)}
            ampm={false}
            format="DD.MM.YYYY HH:mm"
            sx={{ mt: 1, width: "100%" }}
          />
          <TextField
            required
            margin="dense"
            label="Activity"
            value={activity}
            onChange={e => setActivity(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Duration (min)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}