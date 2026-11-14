export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };

}

export type Training = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: TrainingCustomer | null;
}

export type CustomersResponse = {
  _embedded: { customers: Customer[] };
}

export type TrainingCustomer = {
  id: number;
  firstname: string;
  lastname: string;
}