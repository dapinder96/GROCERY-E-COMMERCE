import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Overview from './Overview';
import AddProduct from './AddProduct';
import TrackOrders from './TrackOrders';

const AdminMain = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<TrackOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;