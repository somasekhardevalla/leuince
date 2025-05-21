import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null; 

  const role = user.role;

  return (
    <div className="sidebar bg-light p-3 h-100">
      <h5 className="mb-3">Navigation</h5>
      <Nav className="flex-column">
       
        <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>
          Dashboard
        </Nav.Link>

       
        {role === 'Employee' && (
          <>
            <Nav.Link as={Link} to="/request-access" active={location.pathname === '/request-access'}>
              Request Access
            </Nav.Link>
            <Nav.Link as={Link} to="/my-requests" active={location.pathname === '/my-requests'}>
              My Requests
            </Nav.Link>
          </>
        )}

        
        {role === 'Manager' && (
          <Nav.Link as={Link} to="/pending-requests" active={location.pathname === '/pending-requests'}>
            Pending Requests
          </Nav.Link>
        )}

       
        {role === 'Admin' && (
          <>
            <Nav.Link as={Link} to="/create-software" active={location.pathname === '/create-software'}>
              Create Software
            </Nav.Link>
            <Nav.Link as={Link} to="/software-list" active={location.pathname === '/software-list'}>
              Software List
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
