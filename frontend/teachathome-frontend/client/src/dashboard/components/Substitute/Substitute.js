import React, { Component } from 'react';
import './Substitute.css';

export default class Substitute extends Component {
  render() {
    return (
      <div className="Container">
        <svg className="Shadow"></svg>
        <div className="Headline">
          <span>Vertretungsstunden</span>
        </div>
        <div className="Entry">
          <span>
            Freitag, 18.03.2020 - 3/4 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
        <div className="Entry">
          <span>
            Freitag, 18.03.2020 - 5/6 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
        <div className="Entry">
          <span>
            Freitag, 18.03.2020 - 5/6 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
      </div>
    );
  }
}
