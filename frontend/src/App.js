import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import CustomerRegistration from './pages/registration/CustomerRegistration';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WorkerApplication from './pages/registration/WorkerApplication';
import OwnerRegistration from './pages/registration/OwnerRegistration';
import ShowCompnaies from './pages/ShowCompnaies';
import ShowWorkerApplications from './pages/ShowWorkerApplications';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/customer/register" element={<CustomerRegistration/>}/>
      <Route path="/worker/application" element={<WorkerApplication/>}/>
      <Route path="/owner/register" element={<OwnerRegistration/>}/>
      <Route path="/owner/show-worker-applications" element={<ShowWorkerApplications/>}/>
      <Route path="/user/show-compnaies" element={<ShowCompnaies/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
