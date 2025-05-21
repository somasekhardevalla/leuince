import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Dashboard Component
import Dashboard from './components/Dashboard';

// Admin Components
import CreateSoftware from './components/admin/CreateSoftware';
import SoftwareList from './components/admin/SoftwareList';

// Employee Components
import RequestAccess from './components/employee/RequestAccess';
import UserRequests from './components/employee/UserRequests';

// Manager Components
import PendingRequests from './components/manager/PendingRequests';

// Common Components
import PrivateRoute from './components/common/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes with Layout */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={Dashboard} />
                </ProtectedLayout>
              } 
            />
            
            {/* Employee Routes */}
            <Route 
              path="/request-access" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={RequestAccess} roles={['Employee', 'Admin']} />
                </ProtectedLayout>
              } 
            />
            <Route 
              path="/my-requests" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={UserRequests} roles={['Employee', 'Admin']} />
                </ProtectedLayout>
              } 
            />
            
            {/* Manager Routes */}
            <Route 
              path="/pending-requests" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={PendingRequests} roles={['Manager', 'Admin']} />
                </ProtectedLayout>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/create-software" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={CreateSoftware} roles={['Admin']} />
                </ProtectedLayout>
              } 
            />
            <Route 
              path="/software-list" 
              element={
                <ProtectedLayout>
                  <PrivateRoute component={SoftwareList} roles={['Admin']} />
                </ProtectedLayout>
              } 
            />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

// Protected Layout with Sidebar for authenticated users
const ProtectedLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="px-0">
          <Sidebar />
        </Col>
        <Col md={9} lg={10} className="main-content">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default App;