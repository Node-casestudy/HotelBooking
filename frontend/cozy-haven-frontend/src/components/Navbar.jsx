import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/">Cozy Haven</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Hotels</Link>
          </li>
          {user?.role === 'owner' && (
            <li className="nav-item">
              <Link className="nav-link" to="/owner/dashboard">Owner Dashboard</Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin/verify-owners">Admin Panel</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">{user.name}</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
