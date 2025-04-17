import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">TaskManager</Link>
      </div>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
