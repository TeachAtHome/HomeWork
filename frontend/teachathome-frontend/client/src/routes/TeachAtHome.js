import React, { Component } from 'react';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';
import Substitute from '../components/dashboard/Substitute/Substitute';
import Sick from '../components/dashboard/Sick/Sick';
import Grades from '../components/dashboard/Grades/Grades';
import ExerciseTable from '../components/dashboard/ExerciseTable';

class TeachAtHome extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <div style={marginContainer}>
          <Schoolname />
          <div style={newsStyle}>
            <Substitute />
            <Sick />
          </div>
          <Grades />
          <ExerciseTable tableName={'Offene Aufgaben'} />
          <ExerciseTable tableName={'Geschlossene Aufgaben'} />
          <ExerciseTable tableName={'Archivierte Aufgaben'} />
        </div>
      </div>
    );
  }
}

const containerStyle = {
  paddingLeft: 120,
  paddingRight: 120
};

const marginContainer = {
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
