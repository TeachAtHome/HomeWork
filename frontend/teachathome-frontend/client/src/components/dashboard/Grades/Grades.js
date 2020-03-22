import React, { Component } from 'react';
import './Grades.css';
import ornament from './assets/math.svg';
import { Link } from 'react-router';

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
          <Link
            to={{ pathname: '/classroom', state: { groupName: group.name } }}
          >
            <img src={ornament} className="Icon" />
            <div className="Label">{group.name}</div>
          </Link>
        </div>
      );
    });

    return renderedGroups;
  };

  render() {
    return (
      <div className="Container">
        <svg className="Shadow"></svg>
        <div className="Headline">
          <span>Klassen</span>
        </div>
        <div className="EntriesGrades">{this.renderGroups()}</div>
      </div>
    );
  }
}
