import React, { Component } from 'react';
import './Grades.css';
import ornament from './assets/math.svg';

export default class Grades extends Component {
  render() {
    return (
      <div id="Container">
        <svg className="Shadow"></svg>
        <div className="Headline">
          <span>Klassen</span>
        </div>
        <div className="Entries">
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
          <div className="Entry">
            <img src={ornament} className="Icon" />
            <div className="Label">Mathematik</div>
            <div className="Label">8a</div>
          </div>
        </div>
      </div>
    );
  }
}
