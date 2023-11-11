import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '90px',
        right: '20px',
        cursor: 'pointer',
        zIndex: '50',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#00C9C8',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FiArrowLeft style={{ color: 'white', fontSize: '24px' }} />
        </div>
      </Link>
    </div>
  );
};

export default BackButton;
