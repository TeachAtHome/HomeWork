import React, { Component } from 'react';
import './Sick.css';

export default class Grades extends Component {
  state = {
    students: []
  };

  componentDidMount() {
    this.getGroups()
      .then(res => this.setState({ students: res }))
      .catch(err => console.log(err));
  }

  getGroups = async () => {
    const response = await fetch('/api/student');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  renderStudents = () => {
    const renderedStudents = this.state.students.map((student, key) => {
      if(student.sick == true){
        return (
          <div key={key} className="Student">
            <span>{student.name}</span>
          </div>
        );
      }
    });

    return renderedStudents;
  };

  render() {
    return (
      <div style={containerStyle}>
        <svg className="Shadow" />
        <div className="Headline">
          <span>Kranke Schüler</span>
        </div>
        <div id="Entries">{this.renderStudents()}</div>
      </div>
    );
  }
}

const containerStyle = {
  position: 'relative',
  height: 'auto',
  margin: 32,
  flex: 1,
  overflow: 'visible'
};
