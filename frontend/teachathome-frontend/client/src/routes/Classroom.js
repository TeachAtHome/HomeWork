import React, { Component } from 'react';
import Classroom1 from '../components/classroom/Classroom';

class Classroom extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Classroom1 />
      </div>
    );
  }
}

const containerStyle = {
  justifyContent: 'left',
  alignItems: 'left',
  display: 'flex',
  flexDirection: 'column'
};

export default Classroom;
