import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: 'customers', element: <CustomerList />},
      { path: 'trainings', element: <TrainingList /> },
      { path: 'calendar', element: <TrainingCalendar />},
      {index: true, element: <CustomerList/>}
    ],
  },
], {
  basename: import.meta.env.BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
