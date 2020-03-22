import React, { Component } from 'react';
import './Grades.css';
import ornament from './assets/math.svg';

export default class Grades extends Component {
  state = {
    groups: []
  };

  componentDidMount() {
    this.getGroups()
      .then(res => this.setState({ groups: res }))
      .catch(err => console.log(err));
  }

  getGroups = async () => {
    const response = await fetch('/api/group');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  renderGroups = () => {
    const renderedGroups = this.state.groups.map((group, key) => {
      console.log(group);
      return (
        <div className="Entry" key={key}>
          //need to be refactored / value needs to be send to /classroom page
          <div onClick={event =>  window.location.href='/classroom'}>
            <img src={ornament} className="Icon" />
            <div className="Label">{group.name}</div>
          </div>
        </div>
      );
    });

    return renderedGroups;
  };

  render() {
    return (
      <div id="Container">
        <svg className="Shadow"></svg>
        <div className="Headline">
          <span>Klassen</span>
        </div>
        <div className="Entries">{this.renderGroups()}</div>
      </div>
    );
  }
}
