import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '',
    workPosition: '',
    address: '',
    img: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/employees', employee);
      toast.success('Employee added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error adding employee');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Add Employee</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Work Position</label>
            <input
              type="text"
              name="workPosition"
              className="form-control"
              value={employee.workPosition}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={employee.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Image URL</label>
            <input
              type="text"
              name="img"
              className="form-control"
              value={employee.img}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
