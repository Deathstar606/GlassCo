import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Burger.css';
import { NavItem } from 'reactstrap';

const BurgerMenu = () => {
  const location = useLocation();
  const [isSun, setIsSun] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleSun = () => {
    setIsSun(!isSun);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

const [activeLink, setActiveLink] = useState('');

useEffect(() => {
  setActiveLink(location.pathname);
}, [location]);

  return (
    <div>
      <div className="burger-menu">
        <div className="burger-icon" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <div className='d-flex justify-content-center p-1'>
            <li>
              <NavItem
                activeClassName="active"
                onClick={toggleSun}
              >
                <div className={`burg-menu pr-2 pl-2 ${activeLink === '/menu' ? 'active' : ''}`}>
                  Sunglasses
                </div>
                <AnimatePresence>
                  {isSun && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }} // Added styles
                    >
                      <Link to="/home/sunglass" onClick={toggleMenu}>
                        <h5 className='text-center'>All Sunglasses</h5>
                      </Link>
                      <Link to="/home/sunglass/men" onClick={toggleMenu}>
                        <h5 className='text-center'>For Men</h5>
                      </Link>
                      <Link to="/home/sunglass/women" onClick={toggleMenu}>
                        <h5 className='text-center'>For Women</h5>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>             
              </NavItem>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
