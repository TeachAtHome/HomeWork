import React, { Component } from 'react';
import Substitute from './dashboard/components/Substitute/Substitute';
import Grades from './dashboard/components/Grades/Grades';
import Sick from './dashboard/components/Sick/Sick';

class TeachAtHome extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Substitute />
      </div>
    );
  }
}

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex'
};

export default TeachAtHome;
