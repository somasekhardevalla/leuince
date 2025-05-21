import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import axios from '../../api/axios';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get('/requests/pending');
      setRequests(res.data);
    } catch (err) {
      setError('Failed to fetch pending requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setError(null);
    setMessage(null);
    setProcessing(true);
    
    try {
      await axios.patch(`/requests/${id}`, { status });
      setMessage(`Request ${status.toLowerCase()} successfully`);
      
      // Update the requests list
      fetchPendingRequests();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${status.toLowerCase()} request`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h2 className="mb-4">Pending Access Requests</h2>
      
      {error && <Alert message={error} variant="danger" />}
      {message && <Alert message={message} variant="success" />}
      
      {requests.length === 0 ? (
        <Card>
          <Card.Body>
            <p>There are no pending requests to approve.</p>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Software</th>
                  <th>Access Type</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.user.username}</td>
                    <td>{request.software.name}</td>
                    <td>{request.accessType}</td>
                    <td>{request.reason}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleStatusUpdate(request.id, 'Approved')}
                        disabled={processing}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                        disabled={processing}
                      >
                        Reject
                      </Button>
                    </td>
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

export default PendingRequests;