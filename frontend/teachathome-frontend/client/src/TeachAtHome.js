import React, { Component } from 'react';
import Substitute from './components/dashboard/Substitute';
import Grades from './components/dashboard/Grades';
import Sick from './components/dashboard/Sick';

class TeachAtHome extends Component {
  render() {
    return (
      <div>
        <Substitute />
        <Grades />
        <Sick />
      </div>
    );
  }
}

export default TeachAtHome;
