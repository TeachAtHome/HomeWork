import React, { Component } from 'react';
import Editor from '../components/editor/Editor';

class EditorRouting extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Editor groupName={this.props.location.state.groupName}/>
      </div>
    );
  }
}

export default EditorRouting;
