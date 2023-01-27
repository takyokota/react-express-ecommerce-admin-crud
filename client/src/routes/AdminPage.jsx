import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductList from '../components/AdminProductList';
import Header from '../components/Header';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/products/add');
  };

  return (
    <div>
      <Header
        headerTitle={'Products'}
        url={'/'}
        urlTo={'Homepage'}
      />
      <div>
        <button onClick={() => handleAdd()} className="btn btn-primary mb-3">Add a new product</button>
      </div>
      <AdminProductList />
    </div>
  );
};

export default AdminPage;