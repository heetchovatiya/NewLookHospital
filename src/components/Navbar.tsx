import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, profile } = useAuth() || {};

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">New Look Hospital</Link>
        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              {profile?.is_admin && <Link to="/admin" className="text-white">Admin</Link>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;