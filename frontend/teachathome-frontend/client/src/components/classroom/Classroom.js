import React, { Component } from 'react';
import './Classroom.css';
import { Link } from 'react-router';

export default class Classroom extends Component {
  constructor(props) {
    super(props);
    console.log('test', this.props);
    this.groupName = this.props.group.name;
  }

  state = {
    classroom: {}
  };

  componentDidMount() {
    this.callGetStudentsOfClassApi()
      .then(res => this.setState({ classroom: res }))
      .catch(err => console.log(err));
  }

  callGetStudentsOfClassApi = async () => {
    const response = await fetch('/api/group/' + this.groupName + '/students');
    const resStudents = await response.json();
    console.log(resStudents);
    if (response.status !== 200) throw Error(resStudents.message);
    return resStudents;
  };

  renderStudents = () => {
    if (this.state.classroom.students) {
      const renderedStudents = this.state.classroom.students.map(
        (student, key) => {
          return (
            <div key={key} className="Student">
              <span>{student.name + ' - ' + student.email}</span>
            </div>
          );
        }
      );
      return renderedStudents;
    }
    return null;
  };

  render() {
    return (
      <div>
        <div className="ClassroomContainer">
          <svg className="Shadow" />
          <div className="HeadlineClassroom">
            <span>Schüler der {this.groupName}</span>
          </div>
          <div id="Entries">{this.renderStudents()}</div>
        </div>
        <div style={linkstyle}>
          <Link
            style={{ textDecoration: 'none' }}
            to={{
              pathname: '/editor',
              state: { groupName: this.groupName }
            }}
          >
            Neue Hausaufgabe erstellen
          </Link>
        </div>
      </div>
    );
  }
}

const linkstyle = {
  borderRadius: 40,
  padding: 12,
  textAlign: 'center',
  fontSize: 24,
  margin: 32,
  marginBottom: 0,
  textAlignVertical: 'center',
  border: '1px solid rgb(26,49,65)'
};
