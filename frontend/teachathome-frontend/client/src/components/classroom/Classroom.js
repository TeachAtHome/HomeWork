import React, { Component } from "react";
import "./Classroom.css";
import Studentlist from "./Studentlist";

export default class Classroom extends Component {
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
    const response = await fetch("/api/group/3B-Mathe");
    const className = await response.json();
    if (response.status !== 200) throw Error(className.message);
    return className;
  };

  render() {
    return (
      <div className="App">
        <header>
          <a className="App-link" href="/" rel="noopener noreferrer">
            Startseite
          </a>
        </header>
        <div>
          <Studentlist items={this.state.classroom}/>
        </div>
        <a href="#"> New Entry</a>
      </div>
    );
  }
}
