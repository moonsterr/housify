import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from './Pages/Registration/CreateAccount';
import Home from './Pages/Home';
import RegistrationLayout from './Components/RegistrationLayout';
import Login from './Pages/Registration/Login';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="registration" element={<RegistrationLayout />}>
            <Route path="create" element={<CreateAccount />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
