import React from 'react';
import AddProduct from '../components/AddProduct';

const AddPage = () => {
  return (
    <div>
      <div className='text-center my-3'>
        <h1>Add a Product</h1>
      </div>
      <AddProduct />
    </div>
  );
};

export default AddPage;