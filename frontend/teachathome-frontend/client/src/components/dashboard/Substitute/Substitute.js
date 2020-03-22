import React, { Component } from 'react';
import './Substitute.css';

export default class Substitute extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <svg className="Shadow" />
        <div className="Headline">
          <span>Vertretungsstunden</span>
        </div>
        <div className="Substitute">
          <span>
            Mittwoch, 18.03.2020 - 3/4 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
        <div className="Substitute">
          <span>
            Mittwoch, 18.03.2020 - 5/6 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
        <div className="Substitute">
          <span>
            Freitag, 20.03.2020 - 5/6 Stunde, Klasse 7a für Herr Sanders
          </span>
        </div>
      </div>
    );
  }
}

const containerStyle = {
  position: 'relative',
  height: 'auto',
  margin: 32,
  flex: 1,
  overflow: 'visible'
};
