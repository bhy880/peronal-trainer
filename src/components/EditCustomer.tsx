import { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { Customer } from "../types";
import { updateCustomer } from "../api";
import CustomerForm from "./CustomerForm";

type EditCustomerProps = {
  customerData: Customer;
  fetchCustomers: () => void;
};

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    // Kopioidaan rivin tiedot lomakkeelle (ilman _links-kenttää)
    setOpen(true);
    setCustomer({
      firstname: props.customerData.firstname,
      lastname: props.customerData.lastname,
      streetaddress: props.customerData.streetaddress,
      postcode: props.customerData.postcode,
      city: props.customerData.city,
      email: props.customerData.email,
      phone: props.customerData.phone,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateCustomer(props.customerData._links!.self.href, customer)
      .then(() => props.fetchCustomers())
      .catch(err => console.error(err));
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}