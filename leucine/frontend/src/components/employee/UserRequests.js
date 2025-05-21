import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge } from 'react-bootstrap';
import axios from '../../api/axios';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/requests/user');
        setRequests(res.data);
      } catch (err) {
        setError('Failed to fetch your requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getStatusBadge = (status) => {
    let variant = 'secondary';
    
    switch (status) {
      case 'Approved':
        variant = 'success';
        break;
      case 'Rejected':
        variant = 'danger';
        break;
      case 'Pending':
        variant = 'warning';
        break;
      default:
        variant = 'secondary';
    }
    
    return <Badge bg={variant}>{status}</Badge>;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h2 className="mb-4">My Access Requests</h2>
      
      {error && <Alert message={error} variant="danger" />}
      
      {requests.length === 0 ? (
        <Card>
          <Card.Body>
            <p>You haven't made any access requests yet.</p>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Software</th>
                  <th>Access Type</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.software.name}</td>
                    <td>{request.accessType}</td>
                    <td>{getStatusBadge(request.status)}</td>
                    <td>{request.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default UserRequests;