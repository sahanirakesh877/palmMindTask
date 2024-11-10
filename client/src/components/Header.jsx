import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaUserPlus } from 'react-icons/fa';
import { FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-dark py-3">
      <div className="container d-flex justify-content-between align-items-center">
       
        <div className="logo">
          <h4 className="text-white m-0 fst-italic fw-semibold " >PalmMind  Task</h4>
        </div>

        <div className="d-flex align-items-center">
          <Link to="/register" className="btn btn-light mx-2 px-4 py-1 rounded-pill hover-effect">
          <FaUserPlus /> Register 
          </Link>
          <Link to="/login" className="btn btn-primary mx-2 px-4 py-1 rounded-pill hover-effect">
          <FaSignInAlt />  Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
