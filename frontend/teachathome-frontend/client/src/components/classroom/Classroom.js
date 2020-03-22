import React, { Component } from "react";
import "./Classroom.css";
import Studentlist from "./Studentlist";
import { Link } from 'react-router';

export default class Classroom extends Component {

  constructor(props) {
      super(props);
      this.groupName = this.props.group.name;
  }

  state = {
    className: "",
    classroom: {}
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ classroom: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/group/" + this.groupName);
    const className = await response.json();
    if (response.status !== 200) throw Error(className.message);
    return className;
  };

  render() {
    return (
      <div className="App">
        <div>
          <Studentlist items={this.state.classroom}/>
        </div>
        <Link to={{ pathname: '/editor', state: {groupName: this.state.classroom.name} } }>Neue Hausaufgabe erstellen</Link>
      </div>
    );
  }
}
