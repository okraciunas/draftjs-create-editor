import React from 'react';
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState
} from 'draft-js';
import '../css/BoxEditor.css';

export default class BoxEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: this._getEditorState()
    };

    this._style = {
      top: this.props.y,
      left: this.props.x,
      width: this.props.width,
      height: this.props.height,
      backgroundColor: this.props.backgroundColor
    };

    this._boxEditorRect = { };
    this._editorRect = { };
  }

  _getEditorState = () => {
    if(this.props.content) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)));
    }
    
    return EditorState.createEmpty();
  }

  _onClick = (event) => {
    this._editor.focus();
  }

  _onChange = (editorState) => {
    this.setState({ editorState });
  }

  content = () =>  {
    return JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  blur = () => {
    this._editor.blur();
  }

  focus = () => {
    this._editor.focus();
  }

  componentDidUpdate = () => {
    // TODO
    // A verificação precisa ser feita de acordo com a posição Y
    // do cursor e o seu tamanho.
    // É necessário saber a posição do texto que está "fora" da
    // caixa e jogar para uma outra caixa ou aumentar a própria
    // caixa.
    
    /*this._boxEditorRect = this._boxEditor.getBoundingClientRect();
    this._editorRect = this._editor.refs.editor.getBoundingClientRect();

    if(this._editorRect.height > this._boxEditorRect.height) {
      this.props.onFinish(this.props.index);
    }*/

    var editorState = this.state.editorState;

    /*var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();*/

    const currentBlockKey = editorState.getSelection().getStartKey();
    const currentBlockIndex = editorState.getCurrentContent().getBlockMap()
      .keySeq().findIndex(k => k === currentBlockKey)

    console.log(currentBlockKey, currentBlockIndex);
  }

  render() {
    return (
      <div
        ref={node => this._boxEditor = node}
        style={this._style}
        className="box"
        onClick={this._onClick}>
        <Editor
          ref={node => this._editor = node}
          editorState={this.state.editorState}
          onChange={this._onChange}
        />
      </div>
    );
  }
}