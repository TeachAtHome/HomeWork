import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import Substitute from '../components/dashboard/Substitute/Substitute';
import Sick from '../components/dashboard/Sick/Sick';

class TeachAtHome extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Schoolname />
        <Substitute />
        <Sick />
      </div>
    );
  }
}

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
};

export default TeachAtHome;
