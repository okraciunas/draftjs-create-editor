import React from 'react';
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState
} from 'draft-js';
import './BoxEditor.css';

export default class BoxEditor extends React.Component {
  constructor(props) {
    super(props);

    let editorState = null;

    if(this.props.content) {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)));
    }
    else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      editorState: editorState,
      readOnly: true,
      content: ''
    };
  }

  _onDoubleClick = (event) => {
    event.preventDefault();
    
    if(this.state.readOnly) {
      this.setState({readOnly: false});
      
      setTimeout(() => {
        this._editor.focus();
      }, 250);
    }
  }

  _onChange = (editorState) => {
    let editor = this._cont
                  .children[0]
                  .querySelector('.public-DraftEditor-content')
                  .children[0];

    console.log(editor.childNodes[0]);

    this.setState({ editorState });
  }

  _onBlur = (event) => {
    setTimeout(() => {
      this.setState({readOnly: true});
    }, 250);
  }

  content = () => JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

  render() {
    let style = {
      top: this.props.y,
      left: this.props.x,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: this.props.backgroundColor
    }

    return (
      <div
        className="box"
        style={style}
        onDoubleClick={this._onDoubleClick}
        ref={node => this._cont = node}>
        <Editor
          ref={node => this._editor = node}
          editorState={this.state.editorState}
          readOnly={this.state.readOnly}
          onChange={this._onChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
        />
      </div>
    );
  }
}