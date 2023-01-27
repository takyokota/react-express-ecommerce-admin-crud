import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '../apis/ProductManagement';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
  const navigate = useNavigate();

  // form validation
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const onSubmit = async (data, e) => {
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
      await ProductManagement.post('/', formData, {
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
      <form action="" className='needs-validation' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label className='form-label' htmlFor="title">Title:</label>
          <input
            {...register('title', { required: true, maxLength: 50 })}
            value={title}
            onChange={e => setTitle(e.target.value)}
            id="title"
            placeholder='Enter title'
            type="text"
            className="form-control"
          />
          {errors.title && <span style={{ color: "red" }}>Title is required. No more than 50 characters allowed.</span>}
        </div>

        <div className="form-group mb-3">
          <label className='form-label' htmlFor="description">Description:</label>
          <input
            {...register('description', { required: true })}
            value={description}
            onChange={e => setDescription(e.target.value)}
            id="description"
            placeholder='Enter description'
            type="text"
            className="form-control"
          />
          {errors.description && <span style={{ color: "red" }}>Description is required</span>}
        </div>

        <div className="form-group mb-3">
          <label className='form-label' htmlFor="price">Price:</label>
          <input
            {...register('price', { required: true, pattern: /^\d+(\.?\d{0,2})?$/ })}
            value={price}
            onChange={e => setPrice(e.target.value)}
            id="price"
            placeholder='Enter price'
            type="text"
            className="form-control"
          />
          {errors.price && <span style={{ color: "red" }}>Price is required. Please enter numbers only.</span>}
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="picture">Picture:</label>
          <input
            type="file"
            id='picture'
            name='file'
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
          />
        </div>

        <button type='submit' className="btn btn-primary mt-3 me-3">Add</button>
        <button onClick={handleCancel} className="btn btn-light mt-3">Cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;