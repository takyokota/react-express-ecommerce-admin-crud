import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '../apis/ProductManagement';
import { ProductsContext } from '../context/ProductsContext';

const AdminProductList = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const navigate = useNavigate();

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

  const handleUpdate = (id) => {
    navigate(`/admin/products/${id}/update`);
  };

  const handleDelete = async (id) => {
    try {
      await ProductManagement.delete(`/${id}`);
      setProducts(products.filter(product => {
        return product.id !== id;
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='list-group'>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope='col'></th>
            <th scope='col'>Product Name</th>
            <th scope='col'>Description</th>
            <th scope='col'>Price</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {products && products.map(product => {
            // Absolute path to access a image file in express js
            const picAddress = product.picture;
            const picPath = process.env.REACT_APP_SERVER_URL + '/uploads/' + picAddress;

            // add commas in thousands
            let num = parseFloat(product.price);
            let price_amt = num.toLocaleString('en-us', {
              style: 'currency',
              currency: 'USD',
            });

            return (
              <tr key={product.id}>
                <td>
                  {picAddress ? (
                    <img
                      className='image-admin'
                      src={picPath}
                      alt="Product"
                    />
                  ) : (
                    <img
                      className='image-admin'
                      src={require("../image/no_image_available.jpg")}
                      alt="Product"
                    />
                  )
                  }
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{price_amt}</td>
                <td>
                  <button onClick={() => handleUpdate(product.id)} className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;