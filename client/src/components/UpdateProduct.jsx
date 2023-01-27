import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductManagement from '../apis/ProductManagement';
import './style.css';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductManagement.get(`/${id}`);
        setTitle(response.data.data.product.title);
        setDescription(response.data.data.product.description);
        setPrice(response.data.data.product.price);
        setPicture(response.data.data.product.picture);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // Absolute path to access a image file in express js
  const picPath = process.env.REACT_APP_SERVER_URL + '/uploads/' + picture;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      title,
      description,
      price
    };

    const json = JSON.stringify(obj);
    const body = new Blob([json], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append('body', body);
    formData.append('file', file);

    try {
      await ProductManagement.put(`/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      console.log(err);
    }

    navigate('/admin/products');
  };

  const handleCancel = (e) => {
    e.preventDefault();

    navigate('/admin/products');
  };

  return (
    <div>
      <form action="" className='needs-validation'>
        <div className="form-group mb-3">
          <label className='form-label' htmlFor="title">Title:</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            id="title"
            placeholder='Enter title'
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className='form-label' htmlFor="description">Description:</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            id="description"
            placeholder='Enter description'
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className='form-label' htmlFor="price">Price:</label>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            id="price"
            placeholder='Enter price'
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="picture">
            Picture: (select new one only if it needs to be changed)
          </label>
          <input
            type="file"
            id='picture'
            name='file'
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>

        {file ? (<></>) : (
          <div className='mb-3'>
            <p>Current Picture</p>
            {picture ? (
              <img
                className='image-update'
                src={picPath}
                alt="Product"
              />
            ) : (
              <img
                className='image-update'
                src={require("../image/no_image_available.jpg")}
                alt="Product"
              />
            )}
          </div>
        )}

        <button type='submit' onClick={handleSubmit} className="btn btn-primary mt-3 me-3">Update</button>
        <button onClick={handleCancel} className="btn btn-light mt-3">Cancel</button>
      </form>
    </div>
  );
};

export default UpdateProduct;