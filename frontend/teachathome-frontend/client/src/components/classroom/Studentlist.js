import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './Studentlist.css';

export default class Studentlist extends Component {
  state = {
    studentList: {},
    studentClass: ''
  };

  componentDidUpdate(prev) {
    if (prev.items.name !== this.props.items.name && this.props.items.name) {
      this.state.studentClass = this.props.items.name;
      this.callGetStudentsOfClassApi()
        .then(res => this.setState({ studentList: res }))
        .catch(err => console.log(err));
    }
  }

  callGetStudentsOfClassApi = async () => {
    const response = await fetch(
      '/api/group/' + this.state.studentClass + '/students'
    );
    const resStudents = await response.json();
    if (response.status !== 200) throw Error(resStudents.message);
    return resStudents;
  };

  render() {
    if (this.state.studentList.students) {
      var json = this.state.studentList.students;
      let arr = [];
      Object.keys(json).forEach(function(key) {
        arr.push(json[key]);
      });

      return (
        <div id="Container">
          <List>
            <ListItem>
              <ListItemText>
                Schueler der Klasse {this.state.studentClass}
              </ListItemText>
            </ListItem>
            {arr.map((item, key) => (
              <ListItem key={key}>
                <ListItemText>{item.name + ' - ' + item.email} </ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      );
    } else {
      return (
        <div>
          <List>
            <ListItem>
              <ListItemText>
                Schueler der {this.state.studentClass}
              </ListItemText>
            </ListItem>
          </List>
        </div>
      );
    }
  }
}
