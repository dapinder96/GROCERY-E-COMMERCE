import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard />, title: 'Overview' },
    { path: '/admin/add-product', icon: <Package />, title: 'Add Product' },
    { path: '/admin/orders', icon: <ClipboardList />, title: 'Orders' },
  ];

  return (
    <div className="bg-white h-screen w-64 shadow-lg fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-green-600">Admin Panel</h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
              location.pathname === item.path ? 'bg-green-50 text-green-600' : ''
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;