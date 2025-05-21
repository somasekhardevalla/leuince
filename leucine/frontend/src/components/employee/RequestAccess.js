import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from '../../api/axios';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const RequestAccess = () => {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    softwareId: '',
    accessType: 'Read',
    reason: ''
  });

  const { softwareId, accessType, reason } = formData;
  
  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await axios.get('/software');
        setSoftware(res.data);
        
        
        if (res.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            softwareId: res.data[0].id.toString()
          }));
        }
      } catch (err) {
        setError('Failed to fetch software list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);


    if (!softwareId || !accessType || !reason) {
      setError('Please fill all fields');
      return;
    }

    try {
      setSubmitting(true);
      await axios.post('/requests', formData);
      setMessage('Access request submitted successfully');
      
   
      setFormData({
        ...formData,
        reason: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  // Get access levels for selected software
  const getAccessLevels = () => {
    if (!softwareId) return [];
    const selectedSoftware = software.find(sw => sw.id.toString() === softwareId.toString());
    return selectedSoftware ? selectedSoftware.accessLevels : [];
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h2 className="mb-4">Request Software Access</h2>
      
      {error && <Alert message={error} variant="danger" />}
      {message && <Alert message={message} variant="success" />}
      
      {software.length === 0 ? (
        <Card>
          <Card.Body>
            <p>No software available to request access.</p>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Software</Form.Label>
                <Form.Select 
                  name="softwareId"
                  value={softwareId}
                  onChange={onChange}
                  required
                >
                  <option value="">Select Software</option>
                  {software.map(sw => (
                    <option key={sw.id} value={sw.id}>
                      {sw.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Access Type</Form.Label>
                <Form.Select
                  name="accessType"
                  value={accessType}
                  onChange={onChange}
                  required
                >
                  {getAccessLevels().map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Reason for Access</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="reason"
                  value={reason}
                  onChange={onChange}
                  placeholder="Please explain why you need access to this software"
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default RequestAccess;