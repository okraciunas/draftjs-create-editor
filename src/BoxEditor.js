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
      content: ''
    };
  }

  _onChange = (editorState) => {
    this.setState({ editorState });
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
        style={style}>
        <Editor
          editorState={this.state.editorState}
          onChange={this._onChange}
        />
      </div>
    );
  }
}