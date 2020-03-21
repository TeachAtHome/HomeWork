import React, { Component } from 'react';
import './Sick.css';

const students = ['Schüler 1', 'Schüler 2', 'Schüler 3', 'Schüler 4'];

export default class Grades extends Component {
  renderStudents = () => {
    const renderedStudents = students.map((student, key) => {
      return (
        <div className="Student">
          <span>{student}</span>
        </div>
      );
    });

    return renderedStudents;
  };

  render() {
    return (
      <div className="Container">
        <svg className="Shadow" />
        <div className="Headline">
          <span>Kranke Schüler</span>
        </div>
        {this.renderStudents()}
      </div>
    );
  }
}
