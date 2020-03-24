import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname';
import Substitute from '../components/dashboard/Substitute';
import Sick from '../components/dashboard/Sick';
import Grades from '../components/dashboard/Grades';
import ExerciseTable from '../components/dashboard/ExerciseTable';

class TeachAtHome extends Component {
  render() {
    return (
      <div style={paddingContainer}>
        <div style={containerStyle}>
          <Schoolname />
          <div style={newsStyle}>
            <Substitute />
            <Sick />
          </div>
          <Grades />
          <ExerciseTable tableName={'Alle offenen Aufgaben'} />
          <ExerciseTable tableName={'Alle geschlossenen Aufgaben'} />
          <ExerciseTable tableName={'Alle archivierten Aufgaben'} />
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

const newsStyle = {
  display: 'flex',
  flexGrow: 1,
  alignSelf: 'stretch',
  flexDirection: 'row'
};

export default TeachAtHome;
