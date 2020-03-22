import React, { Component } from 'react';
import './Schoolname.css';
import logo from '../../../assets/Logo.png';
import logoText from '../../../assets/LogoText.png';

export default class Schoolname extends Component {
  render() {
    return (
      <div id="Container">
        <a href="/">
          <img id="Logo" src={logo} alt="Logo" />
          <img id="LogoText" src={logoText} alt="logoText" />
        </a>
        <div id="Titel">
          <span>Geschwister-Scholl-Gymnasium</span>
        </div>
        <div className="Year">
          <span>Schuljahr 2020/21</span>
        </div>
      </div>
    );
  }
}
