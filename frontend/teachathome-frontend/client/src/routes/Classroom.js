import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import ClassroomList from '../components/classroom/Classroom';

class Classroom extends Component {
  render() {
    return (
      <div style={paddingContainer}>
        <div style={containerStyle}>
          <Schoolname />
          <div style={divClassroom}>
            <ClassroomList groupName={this.props.location.state.groupName} />
          </div>
        </div>
      </div>
    );
  }
}

const paddingContainer = {
  paddingLeft: 120,
  paddingRight: 120
};

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '48',
  marginRight: '48'
};

const divClassroom = {
  justifyContent: 'left',
  alignItems: 'left',
  display: 'flex',
  flexDirection: 'column'
};

export default Classroom;
