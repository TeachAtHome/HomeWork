import React, { Component } from 'react';
import './Substitute.css';

export default class Substitute extends Component {
  render() {
    return (
      <div id="Vertretungsstunden">
        <svg className="Surface_u">
          <rect
            fill="rgba(255,255,255,1)"
            id="Surface_u"
            rx="4"
            ry="4"
            x="0"
            y="0"
            width="833"
            height="163"
          ></rect>
        </svg>
        <div id="Vertretungsstunden_v">
          <span>Vertretungsstunden</span>
        </div>
        <div id="reitag__18_03_2020___3_4_Stun">
          <span>
            Freitag, 18.03.2020 - 3/4 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
        <div id="Freitag__18_03_2020___5_6_Stun">
          <span>
            Freitag, 18.03.2020 - 5/6 Stunde, Klasse 8b für Frau Meyer
          </span>
        </div>
      </div>
    );
  }
}
