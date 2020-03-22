import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import ClassroomList from '../components/classroom/Classroom';
import ExerciseTable from '../components/dashboard/ExerciseTable';

class Classroom extends Component {
  render() {
    return (
      <div style={paddingContainer}>
        <div style={containerStyle}>
          <Schoolname />
          <div style={divClassroom}>
            <ClassroomList group={this.props.location.state.group} />
          </div>
        </div>
        <ExerciseTable
          groupID={this.props.location.state.group._id}
          groupName={this.props.location.state.group.name}
          tableName={'Offene Aufgaben der Klasse'}
        />
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
