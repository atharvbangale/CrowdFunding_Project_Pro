import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// App.js
import './App.css';
import axios from "axios";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";


import Admin from "./Admin/Admin";
import AddOrganization from "./Admin/AddOrganization";
import ViewOrganization from "./Admin/ViewOrganization";
import EditOrganization from "./Admin/EditOrganization";
import ViewAllFundings from "./Admin/ViewAllFundings";

import YourFunds from "./Customer/YourFunds";
import EditProfile from "./Customer/EditProfile";
import Funds from "./Components/Funds";
import Payment from "./Customer/Payment";


import Organization from "./Organization/Organization";
import RaiseFundRequest from "./Organization/RaiseFundRequest";
import MyFundRequests from "./Organization/MyFundRequests";
import ViewFundings from "./Organization/ViewFundings";






function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addorganization" element={<AddOrganization />} />
            <Route path="/admin/viewallorganizations" element={<ViewOrganization/>} />
            <Route path="/admin/editorganization/:id" element={<EditOrganization />}/>
            <Route path="/admin/viewallfundings" element={<ViewAllFundings />}/>
    
            {/* <Route path="/admin/viewallpayments" element={<ViewPayments />} /> */}
       
    

            <Route path="/editprofile/:userId" element={<EditProfile/>}/>
            <Route path="/yourfunds" element={<YourFunds/>}/>
            <Route path="/payment" element={<Payment />}/>

            <Route path="/organization" element={<Organization />}/>
            <Route path="/organization/raisefund" element={<RaiseFundRequest />}/>
            <Route path="/organization/viewfundraised" element={<MyFundRequests />}/>
            <Route path="/organization/viewfundings/:fundId" element={<ViewFundings />} />


            </Routes>
      </Router>
    </div>
  );
 }


export default App;
