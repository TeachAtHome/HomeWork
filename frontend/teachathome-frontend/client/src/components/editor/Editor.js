import React from 'react';

import "./Editor.css";
import { Button } from '@material-ui/core';
import { Link } from 'react-router';
import '@ckeditor/ckeditor5-build-classic/build/translations/de';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const answerPlaceHolder = '<span contenteditable="false" class="ico fr-deletable disabled answer">Antwort</span>';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: null,
            group: this.props.group,
            content: 'Hier Tippen',
            documentRefId: this.props.documentRefId
        };

    }

    componentDidUpdate(prevState) {
        if (this.props.initialContent !== prevState.initialContent) {
            this.setState({ model: this.props.initialContent });
        }
    }

    async saveMetaData(state, documentRefId) {
        var payload = { documentRefId: documentRefId, groups: [state.group.name] };
        console.log("PAY:");
        console.log(payload);
        const response = await fetch("/api/document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.status >= 400) {
            console.log(`Error, failed to post entry metadata. Document ${documentRefId} is orphaned.`)
        } else {
            console.log("Uploaded entry metadata");
        }
    }

    async saveData(state, updateState = true) {
        var payload = { content: state.content }
        if (state.documentRefId) {
            payload.documentRefId = state.documentRefId;
        }

        const response = await fetch("/api/storage/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        console.log(response)
        if (response.status >= 400) {
            console.log(`Error, failed to post entry content`)
        } else {
            console.log("Uploaded content");
        }

        var documentRefId = state.documentRefId;
        if (!documentRefId) {
            const text = await response.text();
            documentRefId = JSON.parse(text).id;
            if (updateState) {
                this.setState({ documentRefId: documentRefId });
            }
            
        }
        console.log(state.documentRefId);

        await this.saveMetaData(state, documentRefId);
    }

    render() {
        return (
            <div>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.state.content}
                    config={{ language: 'de' }}
                    onInit={editor => {
                        this.setState({ editor: editor })
                    }}
                    onChange={(event, editor) => {
                        this.setState({ content: editor.getData() })
                    }}
                />
                <Button onClick={() => this.saveData(this.state) }>Speichern</Button>
                <Link
                    onClick={() => this.saveData(this.state, false)}
                    style={{ textDecoration: 'none' }}
                    to={{
                        pathname: '/classroom',
                        state: { group: this.state.group }
                    }}>
                    Speichern und zurück
                </Link>
            </div>
        );
    }
}
export default Editor;