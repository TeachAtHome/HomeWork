import React, { Component } from 'react';
import './Sick.css';

export default class Grades extends Component {
  state = {
    response: "",
    post: "",
    responseToPost: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
    console.log(this.state);
  }

  callApi = async () => {
    const response = await fetch("/api/student");
    console.log(response);
    const body = await response.text();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div id="Kranke_Schueler">
        <svg class="Surface" viewBox="0 0 229.445 303">
          <path
            fill="rgba(255,255,255,1)"
            id="Surface"
            d="M 4 0 L 225.444580078125 0 C 227.6537170410156 0 229.444580078125 3.329023361206055 229.444580078125 7.435582160949707 L 229.444580078125 295.5644226074219 C 229.444580078125 299.6709594726562 227.6537170410156 303 225.444580078125 303 L 114.9109497070312 303 L 4 303 C 1.790860891342163 303 0 299.6709594726562 0 295.5644226074219 L 0 7.435582160949707 C 0 3.329023361206055 1.790860891342163 0 4 0 Z"
          ></path>
        </svg>
        <div id="Kranke_Sch_ler_i">
          <span>Kranke Schüler</span>
        </div>
        <div id="Repeat_Grid_2">
          <div id="Repeat_Grid_2_0">
            <div id="Thomas_Meyer__5c">
              <span>Thomas Meyer, 5c</span>
            </div>
            <div id="Peter_M_ller__7a">
              <span>Peter Müller, 7a</span>
            </div>
          </div>
          <div id="Repeat_Grid_2_1">
            <div id="Thomas_Meyer__5c_o">
              <span>Thomas Meyer, 5c</span>
            </div>
            <div id="Peter_M_ller__7a_p">
              <span>Peter Müller, 7a</span>
            </div>
          </div>
          <div id="Repeat_Grid_2_2">
            <div id="Thomas_Meyer__5c_r">
              <span>Thomas Meyer, 5c</span>
            </div>
            <div id="Peter_M_ller__7a_s">
              <span>Peter Müller, 7a</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
