import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsContextProvider } from './context/ProductsContext';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import AdminPage from './routes/AdminPage';
import AddPage from './routes/AddPage';

const App = () => {
  return (
    <ProductsContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path='/admin/products/add' element={<AddPage />} />
            <Route exact path='/admin/products/:id/update' element={<UpdatePage />} />
            <Route exact path='/admin/products' element={<AdminPage />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </ProductsContextProvider>
  );
};

export default App;