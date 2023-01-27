import React from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      <Header
        headerTitle={'Products For Sale'}
        url={'/admin/products'}
        urlTo={'Admin'}
      />
      <ProductList />
    </div>
  );
};

export default Home;