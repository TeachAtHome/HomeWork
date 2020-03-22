import React, { Component } from 'react';
import Editor from '../components/editor/Editor';
import Schoolname from '../components/dashboard/Schoolname/Schoolname';

class EditorRouting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      documentRefId: "4229ba4f-225d-46a4-acf4-1acc1dde9aff",
      loadDocument: this.props.loadDocument
    }
    if (this.props.loadDocument) {
      this.getDocument();
    }
  }

  async getDocument() {
    const response = await fetch("/api/storage/document/" + this.state.documentRefId);
    console.log(response);
    const body = await response.text();
    if (response.status >= 400) throw Error(body.message);
    var content = JSON.parse(body).content
    content = this.state.studentView ? this.createStudentViewOnContent(content) : content
    this.setState({
      content: content
    });
  }


  createStudentViewOnContent(content) {
    // Replacement has to be improve (replace whole span instead of "Antwort")!
     var c = content.replace(new RegExp("Antwort", 'g'), '<span contenteditable="true" class="enabled"> <span class="ico fr-deletable" contenteditable="true">Antwort</span> </span>');
     c = '<div class="disabled">' + c + '</div>';
     console.log(c);
     return c;
  }

  render() {
    return (
      <div style={paddingContainer}>
        <div style={containerStyle}>
          <Schoolname />
          <Editor group={this.props.location.state.group} initialContent={this.state.content} />
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
