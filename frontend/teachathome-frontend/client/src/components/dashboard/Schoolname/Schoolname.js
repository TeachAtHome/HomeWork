import React, { Component } from 'react';
import './Schoolname.css';

export default class Schoolname extends Component {
  render() {
    return (
      <div className="Container">
        <div className="Titel">
          <span>Geschwister-Scholl-Gymnasium</span>
        </div>
        <div className="Year">
          <span>Schuljahr 2020/21</span>
        </div>
      </div>
    );
  }
}
