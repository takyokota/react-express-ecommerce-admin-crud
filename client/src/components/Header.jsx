import React from 'react';

const Header = (props) => {
  return (
    <div className='position-relative mb-5'>
      <h1 className='display-3 text-center'>
        {props.headerTitle}
      </h1>
      <div className='position-absolute end-0'>
        <a href={props.url} >{props.urlTo}</a>
      </div>
    </div>
  );
};

export default Header;