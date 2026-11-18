import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { Customer } from "../types";
import { addCustomer } from "../api";
import CustomerForm from "./CustomerForm";

type AddCustomerProps = {
  fetchCustomers: () => void;
};

const emptyCustomer: Customer = {
  firstname: "",
  lastname: "",
  streetaddress: "",
  postcode: "",
  city: "",
  email: "",
  phone: "",
};

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);

  const handleClickOpen = () => {
    setCustomer(emptyCustomer); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addCustomer(customer)
      .then(() => props.fetchCustomers())
      .catch(err => console.error(err));
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ mb: 1 }}>
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}