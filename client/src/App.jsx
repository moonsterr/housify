import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './Pages/Registration/CreateAccount';
import Home from './Pages/Home';
import RegistrationLayout from './Components/RegistrationLayout';
import Login from './Pages/Registration/Login';
import Gauth from './Pages/Gauth';
import Layout from './Components/Layout';
import Explore from './Pages/Explore';
import Offers from './Pages/Offers';
import Profile from './Pages/Profile';
import Listing from './Pages/listing';
import Property from './Pages/property';
import All from './Pages/All';
import Rent from './Pages/rent';
import Sale from './Pages/sale';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Explore />} />
          <Route path="offers" element={<Offers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="createlist" element={<Listing />} />
          <Route path="property/:id" element={<Property />} />
          <Route path="all" element={<All />} />
          <Route path="rent" element={<Rent />} />
          <Route path="sale" element={<Sale />} />
        </Route>
        <Route path="/registration" element={<RegistrationLayout />}>
          <Route path="create" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/gauth" element={<Gauth />} />
      </Routes>
    </BrowserRouter>
  );
}
