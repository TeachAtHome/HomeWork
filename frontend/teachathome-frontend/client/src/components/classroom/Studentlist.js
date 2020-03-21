import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './Studentlist.css';
import Student from '../shared/Student';


export default class Studentlist extends Component {
  state = {
    resStudents: {},
    studentClass: this.props.className
  };

  componentDidMount() {
    this.callGetStudentsOfClassApi()
      .then(res => this.setState({ studentList: res }))
      .catch(err => console.log(err));
    console.log(this.state);
  }

  callGetStudentsOfClassApi = async () => {
    const response = await fetch("/api/group/" + this.state.studentClass +"/allStudents");
    const resStudents = await response.json();
    if (response.status !== 200) throw Error(resStudents.message);
    return resStudents;
  };

  render() {
    return (
       <div>
          <List>
            <ListItem>
              <ListItemText>Schueler der Klasse {this.props.className}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </List>
      </div>
    );
  }
}
