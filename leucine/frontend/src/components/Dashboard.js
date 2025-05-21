import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>
      
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Welcome, {user.username}!</Card.Title>
              <Card.Text>
                You are logged in as <strong>{user.role}</strong>.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        {user.role === 'Employee' && (
          <>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Request Software Access</Card.Title>
                  <Card.Text>
                    Request access to available software applications.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>My Requests</Card.Title>
                  <Card.Text>
                    View status of your access requests.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
        
        {user.role === 'Manager' && (
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Pending Approval Requests</Card.Title>
                <Card.Text>
                  Review and approve/reject access requests from employees.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        
        {user.role === 'Admin' && (
          <>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Create Software</Card.Title>
                  <Card.Text>
                    Add new software to the system.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Software List</Card.Title>
                  <Card.Text>
                    View and manage available software.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Pending Approvals</Card.Title>
                  <Card.Text>
                    Review and manage access requests.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
