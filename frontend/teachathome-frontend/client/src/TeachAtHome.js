import React, { Component } from 'react';
import Schoolname from './dashboard/components/Schoolname/Schoolname';
import Substitute from './dashboard/components/Substitute/Substitute';
import Grades from './dashboard/components/Grades/Grades';
import Sick from './dashboard/components/Sick/Sick';

class TeachAtHome extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Schoolname />
        <Substitute />
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
