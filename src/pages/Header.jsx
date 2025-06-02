import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from '../components/auth';
import { useCart } from '../context/cartContext'; 

function Header({ showUserLinks = true, showAuthButtons = true }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';


  useEffect(() => {
    const user = getLoggedInUser();
    setIsLoggedIn(!!user);
  }, [location]);


  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className={`flex justify-between w-full absolute top-0 left-0 px-32 py-4 shadow-md`}>
      <div>
        <Link to="/" className='text-2xl font-semibold'><h1>ShopMobile</h1></Link>
      </div>
      <div>
        <ul className='flex gap-4 items-center'>
          {showUserLinks && isLoggedIn && (
            <>
              <li>
                <Link to="/cart" title="Cart">
                  🛒 {cartCount > 0 && <span className="text-red-600 font-bold">({cartCount})</span>}
                </Link>
              </li>
              <li>
                <Link to="/orders" title="Orders">📦</Link>
              </li>
            </>
          )}
          {showAuthButtons && (
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold text-red-600 hover:underline"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-lg border-2 p-1 rounded-md font-semibold text-black hover:underline">
                  Login
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
