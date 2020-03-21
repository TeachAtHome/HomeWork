import React, { Component } from "react";
import "./Classroom.css";
import Studentlist from "./Studentlist";



export default class Classroom extends Component {
  state = {
    response: "",
    classroom: {}
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ classroom: res }))
      .catch(err => console.log(err));
    console.log(this.state);
  }

  callApi = async () => {
    const response = await fetch("/api/group/3B-Mathe");
    console.log(response);
    const className = await response.json();
    console.log(className);
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
        <span>{this.state.classroom.name}</span>
        <div>
          <Studentlist />
        </div>
        <a href="#" onClick={console.log("TEST")}> New Entry</a>
      </div>
    );
  }
}
