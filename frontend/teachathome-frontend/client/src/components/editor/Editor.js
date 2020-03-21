import React from 'react';

import "./Editor.css";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/print.min.js'

import 'froala-editor/js/plugins/align.min.js';

import 'froala-editor/js/languages/de.js';

import 'froala-editor/js/third_party/image_tui.min.js';
import 'froala-editor/js/third_party/embedly.min.js';
import 'froala-editor/js/third_party/spell_checker.min.js';
import Froala from "froala-editor";
import FroalaEditorComponent from 'react-froala-wysiwyg';

// currently not in use
const studentPluginSet = [
    "align",
    "charCounter",
    "codeBeautifier",
    "codeView",
    "colors",
    "draggable",
    "embedly",
    "emoticons",
    "entities",
    "file",
    "fontFamily",
    "fontSize",
    "fullscreen",
    "image",
    "imageTUI",
    "imageManager",
    "inlineStyle",
    "inlineClass",
    "lineBreaker",
    "lineHeight",
    "link",
    "lists",
    "paragraphFormat",
    "paragraphStyle",
    "quickInsert",
    "quote",
    "save",
    "table",
    "url",
    "video",
    "wordPaste"
]
const defaultConfig = {
    // adjust for localization
    language: 'de',
    charCounterCount: true,
    toolbarSticky: true,
    fullscreen: true,
    imageUpload: false,
    toolbarButtons: [
        'addTodo',
        'save',
        '|',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        '|',
        'fontFamily',
        'fontSize',
        'color',
        'paragraphStyle',
        '|',
        'align',
        'formatOL',
        'formatUL',
        'outdent',
        'indent',
        '|',
        'paragraphFormat',
        'specialCharacters',
        'insertHR',
        '|',
        'clearFormatting',
        'insertLink',
        'insertImage',
        'embedly',
        'insertFile',
        'insertTable',
        '|',
        'undo',
        'redo',
        '|',
        'help'
    ],
    videoUpload: false,
    fileUpload: false,
    autosave: true,
    saveInterval: 1500, // time in milliseconds
    pasteImage: false,
    attribution: false, // Avoid "Powered by" label
    saveParam: 'content',
    saveURL: '/api/storage/store',
    saveRequestType: 'POST',
    //saveParams: {},
};

const answerPlaceHolder = '<span contenteditable="false" class="fr-deletable answer">Antwort</span>';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.config = defaultConfig;
        this.groupName = this.props.groupName;

        this.handleModelChange = this.handleModelChange.bind(this);

        this.state = {
            model: ''
        };
        console.log(this.groupName);
        this.config.events = this.createEventConfig(this.groupName);
    }

    createEventConfig(groupName) {
        return {
            'save.before': function (s) {
            },

            'save.after': async function (resp) {
                const respObj = JSON.parse(resp);                
                if (!respObj.id) {
                    console.log("Error: save response does not contain an id!");
                    return;
                }

                const documentId = JSON.parse(resp).id;
                console.log(documentId)
                const response = await fetch("/api/document", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ documentRefId: documentId, groups: [groupName] })
                });

                if (response.status >= 400) {
                    console.log(`Error, failed to post entry metadata. Document ${documentId} is orphaned.`)
                } else {
                    console.log("Uploaded entry metadata");
                }
            },

            // first parameter "err" contains the error code of the editor
            'save.error': function (err, respError) {
                console.log("Error during editor save action: " + JSON.stringify(respError));
            }
        }
    }

    componentWillMount() {
        Froala.PLUGINS.todoPlugin = function (editor) {

            // Public method that is visible in the instance scope.
            function insertTodoField() {
                editor.selection.save();
                editor.selection.restore();
                editor.html.insert(answerPlaceHolder);
            }

            function _init() { }

            function save() {
                return editor.save.save();
            }

            return {
                _init: _init,
                save: save,
                insertTodoField: insertTodoField
            }
        }
        //Froala.DefineIconTemplate('material_design', '<i class="zmdi zmdi-[NAME]"></i>');
        // CHANGE ICON!!!
        //Froala.DefineIcon('todoIcon', {NAME: 'add', template: 'material_design'});
        Froala.RegisterCommand('addTodo', {
            title: 'Todo hinzufügen',
            icon: '<span>+</span>',
            undo: false,
            focus: false,
            callback: function () {
                console.log(this);
                this.todoPlugin.insertTodoField();
            }
        });
        // CHANGE ICON!!!
        //Froala.DefineIcon('todoIcon', {NAME: 'star'});
        Froala.RegisterCommand('save', {
            title: 'Speichern',
            icon: '<span>save</span>',
            undo: false,
            focus: false,
            callback: function () {
                this.todoPlugin.save();
            }
        });
    }

    handleModelChange(model) {
        this.setState({
            model: model,
        });
    }

    render() {
        return (
            <div>
                <FroalaEditorComponent tag='textarea' config={this.config} model={this.state.model} onModelChange={this.handleModelChange} />
            </div>
        );
    }
}
export default Editor;