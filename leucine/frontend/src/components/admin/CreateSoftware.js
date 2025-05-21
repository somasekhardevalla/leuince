import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from '../../api/axios';
import Alert from '../common/Alert';

const CreateSoftware = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    accessLevels: ['Read', 'Write', 'Admin']
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { name, description, accessLevels } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccessLevelChange = (level) => {
    const updatedLevels = [...accessLevels];
    
    if (updatedLevels.includes(level)) {
      // Remove level if already selected
      const index = updatedLevels.indexOf(level);
      updatedLevels.splice(index, 1);
    } else {
      // Add level if not selected
      updatedLevels.push(level);
    }
    
    setFormData({ ...formData, accessLevels: updatedLevels });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Simple validation
    if (!name || !description || accessLevels.length === 0) {
      setError('Please fill all fields and select at least one access level');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/software', formData);
      setMessage('Software created successfully');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        accessLevels: ['Read', 'Write', 'Admin']
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create software');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Create Software</h2>
      
      <Card>
        <Card.Body>
          {message && <Alert message={message} variant="success" />}
          {error && <Alert message={error} variant="danger" />}
          
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Software Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter software name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Enter software description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Access Levels</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Read"
                  checked={accessLevels.includes('Read')}
                  onChange={() => handleAccessLevelChange('Read')}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Write"
                  checked={accessLevels.includes('Write')}
                  onChange={() => handleAccessLevelChange('Write')}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Admin"
                  checked={accessLevels.includes('Admin')}
                  onChange={() => handleAccessLevelChange('Admin')}
                />
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Software'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateSoftware;