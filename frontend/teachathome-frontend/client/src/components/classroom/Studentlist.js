import React, { Component } from 'react';
import './Studentlist.css';

export default class Studentlist extends Component {
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
      <div id="Schueler der Klasse">
        <div id="Kranke_Sch_ler_i">
          <span>Schueler der Klasse 3B-Mathe</span>
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
