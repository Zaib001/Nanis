import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <div className="flex-1 p-6 overflow-auto">{children}</div>
  </div>
);

export default DashboardLayout;
