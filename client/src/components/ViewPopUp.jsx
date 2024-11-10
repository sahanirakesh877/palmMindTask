import React, { useEffect, useState } from "react";

const ViewPopUp = ({ show, onClose, user }) => {
  if (!show || !user) return null;
  return (
    <>
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title ">User Details</h5>
              <button
                type="button"
                className="btn-close btn btn-light"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPopUp;
