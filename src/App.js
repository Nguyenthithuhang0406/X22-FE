/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Home from "./pages/public/Home/Home";
import RestaurantDetail from "./pages/public/RestaurantDetail/RestaurantDetail";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";
import BookingInfo from "./pages/Staffs/BookingInfo/BookingInfo";
import Checkin from "./pages/Staffs/Checkin/Checkin";
import Checkout from "./pages/Staffs/Checkout/Checkout";
import StaffLogin from "./pages/Staffs/Login/StaffLogin";
import ManagerLogin from "./pages/Manager/Login/ManagerLogin";
import ManagerHome from "./pages/Manager/ManagerHome/ManagerHome";
import StaffRegister from "./pages/Staffs/Login/StaffRegister";
import ForgotPassword from "./pages/public/ForgetPassword/ForgetPassword";
import CreatedRestaurant from "./pages/Restaurant/CreatedRestaurant";
import CreatedStaffAccount from "./pages/Manager/CreatedStaffAccount/CreatedStaffAccount";
import UpdateRestaurant from "./pages/Restaurant/RestaurantUpdate";

import Layout from "./shared/layout/Layout";
import CreateMenu from "./pages/Components/Menu/CreateMenu";

const queryClient = new QueryClient();
export const AppContext = createContext();

const UserRouter = () => {
  return <Layout>
    <Route path="/" element={<Home />} />
    <Route path="/userlogin" element={<Login />} />
    <Route path="/userregister" element={<Register />} />
    <Route path="/userforget" element={<ForgotPassword />} />
    <Route path="/bookinginfo" element={<BookingInfo />} />
    <Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
  </Layout>;
}

const StaffRouter = () => {
  return <>

  </>;
}

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {

      if(user?.type == "manager"){
        if(!user?.restaurantId){
          navigate("/createdRestaurant")
        }
        else( navigate('/managerhome'))
      }
      // else(user?.type == "manager" || user?.type == "staff") {
      //   navigate('/managerhome');
      // }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{ user, setUser }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/userlogin" element={<Layout><Login /></Layout>} />
          <Route path="/userregister" element={<Layout><Register /></Layout>} />
          <Route path="/userforget" element={<Layout><ForgotPassword /></Layout>} />
          <Route path="/bookinginfo" element={<Layout><BookingInfo /></Layout>} />
          <Route path="/restaurant/:restaurantId" element={<Layout><RestaurantDetail /></Layout>} />

          <Route path="/createStaffAccount" element={<CreatedStaffAccount />} />
          <Route path="/createMenu" element={<CreateMenu />} />
          <Route path="/createdRestaurant" element={<CreatedRestaurant />} />
          <Route path="/updatedRestaurant" element={<UpdateRestaurant />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/loginStaff" element={<StaffLogin />} />
          <Route path="/registerStaff" element={<StaffRegister />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managerhome" element={<ManagerHome />} />
        </Routes>
      </AppContext.Provider>
    </QueryClientProvider >
  );
};

export default App;
