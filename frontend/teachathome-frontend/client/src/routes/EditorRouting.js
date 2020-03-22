import React, { Component } from 'react';
import Editor from '../components/editor/Editor';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';

class EditorRouting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={paddingContainer}>
        <div style={containerStyle}>
          <Schoolname />
          <Editor groupName={this.props.location.state.groupName} />
        </div>
      </div>
    );
  }
}

const paddingContainer = {
  paddingLeft: 120,
  paddingRight: 120
};

const containerStyle = {
  justifyContent: 'center',
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '48',
  marginRight: '48'
};

export default EditorRouting;
