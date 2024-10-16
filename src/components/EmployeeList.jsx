import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, sortOrder]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:3000/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:3000/employees/${id}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error('Error deleting employee');
      }
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    const sortedData = [...employees].sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setEmployees(sortedData);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div>
      <h3>Employee List</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button onClick={handleSort} className="btn btn-info mb-3">
        Sort by Name ({sortOrder})
      </button>
      <Link to="/" className="btn btn-success mb-3">Add New Employee</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Work Position</th>
            <th>Address</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.workPosition}</td>
              <td>{employee.address}</td>
              <td><img src={employee.img} alt={employee.name} style={{ width: '50px' }} /></td>
              <td>
                <Link to={`/edit/${employee.id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(employee.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item" onClick={() => setCurrentPage(currentPage - 1)}>
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)}>
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default EmployeeList;
