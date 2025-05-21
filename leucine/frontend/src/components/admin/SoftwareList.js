import React, { useState, useEffect } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import axios from '../../api/axios';
import Alert from '../common/Alert';
import Spinner from '../common/Spinner';

const SoftwareList = () => {
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const res = await axios.get('/software');
        setSoftware(res.data);
      } catch (err) {
        setError('Failed to fetch software');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <h2 className="mb-4">Software List</h2>
      
      {error && <Alert message={error} variant="danger" />}
      
      {software.length === 0 ? (
        <Card>
          <Card.Body>
            <p>No software available.</p>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Access Levels</th>
                </tr>
              </thead>
              <tbody>
                {software.map((sw) => (
                  <tr key={sw.id}>
                    <td>{sw.id}</td>
                    <td>{sw.name}</td>
                    <td>{sw.description}</td>
                    <td>{sw.accessLevels.join(', ')}</td>
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

export default SoftwareList;