import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import ProductManagement from '../apis/ProductManagement';
import './style.css';

const ProductList = () => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductManagement.get('/');
        setProducts(response.data.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [setProducts]);

  return (
    <div>
      {products && products.map(product => {
        return (
          <ProductCard key={product.id} product={product} />
        );
      })}

    </div>
  );
};

export default ProductList;