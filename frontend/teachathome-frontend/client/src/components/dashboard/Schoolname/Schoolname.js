import React, { Component } from 'react';
import './Schoolname.css';

export default class Schoolname extends Component {
  render() {
    return (
      <div id="Container">
        <div id="Titel">
          <span>Geschwister-Scholl-Gymnasium</span>
        </div>
        <div id="Year">
          <span>Schuljahr 2020/21</span>
        </div>
      </div>
    );
  }
}
