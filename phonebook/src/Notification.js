import React from 'react';

const Notification = ({ message, positive }) => {
  if (message === null) {
    return null;
  }

  const positiveStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '14px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const negativeStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '14px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (positive) {
    return <div style={positiveStyle}>{message}</div>
  } else {
    return <div style={negativeStyle}>{message}</div>
  }
};

export default Notification;
