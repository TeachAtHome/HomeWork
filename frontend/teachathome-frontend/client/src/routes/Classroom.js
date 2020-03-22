import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import ClassroomList from '../components/classroom/Classroom';
import ExerciseTable from '../components/dashboard/ExerciseTable';

class Classroom extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={marginContainer}>
          <Schoolname />
        </div>
        <div style={divClassroom}>
          <ClassroomList group={this.props.location.state.group} />
        </div>
        <ExerciseTable groupID={this.props.location.state.group._id} groupName={this.props.location.state.group.name} tableName={'Offene Aufgaben der Klasse'} />
      </div>
    );
  }
}

const marginContainer = {
  justifyContent: 'center',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '48',
  marginRight: '48'
};

const containerStyle = {
  paddingLeft: 120,
  paddingRight: 120
};

const divClassroom = {
  justifyContent: 'left',
  alignItems: 'left',
  display: 'flex',
  flexDirection: 'column'
};

export default Classroom;
