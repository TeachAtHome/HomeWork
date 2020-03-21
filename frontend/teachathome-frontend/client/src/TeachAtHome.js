import React, { Component } from 'react';
import Substitute from './components/dashboard/Substitute';
import Grades from './components/dashboard/Grades';

class TeachAtHome extends Component {
  render() {
    return (
      <div>
        <Substitute />
        <Grades />
      </div>
    );
  }
}

export default TeachAtHome;
