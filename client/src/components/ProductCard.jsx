import React from 'react';

const ProductCard = (props) => {
  const product = props.product;

  // Absolute path to access a image file in express js
  const picAddress = product.picture;
  const picPath = process.env.REACT_APP_SERVER_URL + '/uploads/' + picAddress;

  // show commas in thousands in currency
  let num = parseFloat(product.price);
  const price_amt = num.toLocaleString('en-us', { style: 'currency', currency: 'USD' });

  return (
    <div
      className='card border-light hover-shadow mb-5'
      style={{ width: "100%" }}
    >
      <div className='row g-0'>
        <div className='col-md-5'>
          {picAddress ? (
            <img
              className='image-main img-fluid rounded-start'
              src={picPath}
              alt="Product"
            />
          ) : (
            <img
              className='image-main img-fluid rounded-start'
              src={require("../image/no_image_available.jpg")}
              alt="Product"
            />
          )}
        </div>

        <div className='col-md-7'>
          <div
            className='card-body d-flex flex-column justify-content-between'
            style={{ height: "100%" }}
          >
            <div>
              <h3 className='card-title display-6'>{product.title}</h3>
              <p className='card-text mb-3 fs-4'>{product.description}</p>
            </div>
            <div className='mb-4'>
              <div className='row'>
                <div className='col-5'></div>
                <div className="col-6 d-flex justify-content-between">
                  <p className='fs-3'>Price:</p>
                  <p className='card-text fs-3'>{price_amt}</p>
                </div>
                <div className='col-1'></div>
              </div>
              <div className='d-grid px-3'>
                <button type='button' className='btn btn-danger'>Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;