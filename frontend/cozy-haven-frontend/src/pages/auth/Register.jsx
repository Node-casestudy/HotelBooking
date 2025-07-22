import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="owner">Hotel Owner</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
