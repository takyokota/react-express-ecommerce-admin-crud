import React, { createContext, useState } from 'react';

export const ProductsContext = createContext(null);

export const ProductsContextProvider = props => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProducts = (product) => {
    setProducts([...products, product]);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        addProducts
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};