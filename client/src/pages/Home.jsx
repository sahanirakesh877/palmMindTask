import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewPopUp from "../components/ViewPopUp";
import { FaEye, FaTrash } from 'react-icons/fa'; 

const Home = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/getuser"
        );
        console.log("all data received", response.data.user);
        setData(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewUser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/getuser/${id}`
      );
      console.log('single user',response)
      setSelectedUser(response.data.user); 
      setShowModal(true); 
    } catch (error) {
      console.error("Error fetching single user:", error);
    }
  };


  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/deleteuser/${id}`,
       
      );
      console.log("deleted response", response);
      setData(data.filter((user) => user._id !== id)); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="container mt-5 bg-light rounded">
        <h2 className="mb-4 text-center border-bottom  px-5 py-2">User Table</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleViewUser(user._id)}
                  >
                      <FaEye /> View
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                   <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ViewPopUp
        show={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
    </>
  );
};

export default Home;
