import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import CustomerRegistration from './pages/registration/CustomerRegistration';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WorkerApplication from './pages/registration/WorkerApplication';
import OwnerRegistration from './pages/registration/OwnerRegistration';
import ShowCompanies from './pages/ShowCompanies';
import ShowWorkerApplications from './pages/ShowWorkerApplications';
import { useCookies } from 'react-cookie';
import OwnerProfile from './pages/profiles/OwnerProfile';
import CustomerProfile from './pages/profiles/CustomerProfile';

function App() {
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  console.log(cookies);
  const handleSetCookies = (key,data)=>{
    setCookies(`${key}`, data, { path: '/' });
  }
  const handleRemoveCookies = (key)=>{
    removeCookies(`${key}`,{ path: '/' });
  }


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login setCookies={handleSetCookies}/>}/>

      {/* customer */}
      <Route path="/customer/register" element={<CustomerRegistration setCookies={handleSetCookies}/>}/>
      <Route path="/customer/profile" element={<CustomerProfile cookies={cookies} removeCookies={handleRemoveCookies}/>}/>

      {/* worker */}
      <Route path="/worker/application/:compnay_params_name" element={<WorkerApplication/>}/>

      {/* owner */}
      <Route path="/owner/register" element={<OwnerRegistration setCookies={handleSetCookies} />}/>
      <Route path="/owner/show-worker-applications" element={<ShowWorkerApplications cookies={cookies}/>}/>
      <Route path="/owner/profile" element={<OwnerProfile cookies={cookies} removeCookies={handleRemoveCookies}/>}/>

      {/* show companies */}
      {/* <Route path="/user/show-companies" element={<ShowCompanies/>}/> */}
      <Route path="/" element={<ShowCompanies/>}/>

      {/* page not found */}
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
