import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ message, variant }) => {
  return message ? (
    <BootstrapAlert variant={variant || 'info'}>
      {message}
    </BootstrapAlert>
  ) : null;
};

export default Alert;