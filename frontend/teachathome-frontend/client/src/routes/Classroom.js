import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import ClassroomList from '../components/classroom/Classroom';

class Classroom extends Component {
  render() {
    return (
      <div>
        <div style={containerStyle}>
          <Schoolname />
        </div>
        <div style={divClassroom}>
          <ClassroomList groupName={this.props.location.state.groupName} />
        </div>
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

const divClassroom = {
  justifyContent: 'left',
  alignItems: 'left',
  display: 'flex',
  flexDirection: 'column'
};

export default Classroom;
