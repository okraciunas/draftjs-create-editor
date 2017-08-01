import React from 'react';
import { Editor, EditorState } from 'draft-js';
import './BoxEditor.css';

export default class BoxEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  _onChange = (editorState) => {
    this.setState({editorState});
  }

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