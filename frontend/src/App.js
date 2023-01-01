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
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const handleSetCookies = (key,data)=>{
    setCookies(`${key}`, data, { path: '/' });
  }



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setCookies={handleSetCookies}/>}/>
      <Route path="/customer/register" element={<CustomerRegistration/>}/>
      <Route path="/worker/application" element={<WorkerApplication/>}/>
      <Route path="/owner/register" element={<OwnerRegistration/>}/>
      <Route path="/owner/show-worker-applications" element={<ShowWorkerApplications cookies={cookies}/>}/>
      <Route path="/user/show-compnaies" element={<ShowCompnaies/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
