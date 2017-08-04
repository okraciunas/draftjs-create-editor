import React from 'react';
import Editors from './Editors';
import { 
  convertToPixel,
  getPosition,
  getSize
} from './ConversionHelper';
import '../css/App.css';

const boxMinWidth = 10;
const boxMinHeight = 10;

export default class App extends React.Component {
  constructor() {
    super();

    this.mouse = { };
    this.state = { editors: this._getEditors() };
  }

  _getEditors = () => {
    if(localStorage.getItem('editors')) {
      return [...JSON.parse(localStorage.getItem('editors'))];
    }

    return [];
  }

  _onMouseDown = (event) => {
    if(event.target.classList.contains('container')) {
      event.preventDefault();
      
      this.mouse.isDown = true;
      this.mouse.initialX = event.clientX;
      this.mouse.initialY = event.clientY;
    }
  }

  _onMouseUp = (event) => {
    if(this.mouse.isDown) {
      event.preventDefault();

      this.mouse.finalX = event.clientX;
      this.mouse.finalY = event.clientY;

      let boxWidth = getSize(this.mouse.initialX, this.mouse.finalX, false);
      let boxHeight = getSize(this.mouse.initialY, this.mouse.finalY, false);

      if(boxWidth >= boxMinWidth && boxHeight >= boxMinHeight) {
        this.setState({
          editors: this._updateEditors({
            x: getPosition(this.mouse.initialX, this.mouse.finalX),
            y: getPosition(this.mouse.initialY, this.mouse.finalY),
            width: convertToPixel(boxWidth),
            height: convertToPixel(boxHeight),
            backgroundColor: '#' + Math.round(Math.random() * 16777215).toString(16)
          })
        });
      }

      this.mouse.isDown = false;
    }
  }

  _updateEditors = (editor) => {
    return [...this.state.editors, editor];
  }

  _save = () => {
    this.state.editors.forEach((props, index) => {
      props.content = this._editors.editors()[index].content();
    });

    localStorage.setItem('editors', JSON.stringify(this.state.editors));
  }

  _delete = () => {
    localStorage.removeItem('editors');
    this.setState({ editors: [] });
  }

  render() {
    return (
      <div
        className="wh100 container"
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}>
        <button
          onClick={this._save}>
          SALVE
        </button>
        <button
          onClick={this._delete}>
          APAGÔ
        </button>
        <Editors
          ref={node => this._editors = node}
          editors={this.state.editors}
        />
      </div>
    );
  }
}