import React, { Component } from 'react';
import BoxEditor from './BoxEditor';
import './App.css';

const boxMinWidth = 10;
const boxMinHeight = 10;

export default class App extends Component {
  constructor() {
    super();

    this.mouse = { };
    this.state = { boxes: [ ] };
  }

  _onMouseDown = (event) => {
    if(event.target.classList.contains('container')) {
      event.preventDefault();
      
      this.mouse.initialX = event.clientX;
      this.mouse.initialY = event.clientY;
    }
  }

  _onMouseUp = (event) => {
    if(event.target.classList.contains('container')) {
      event.preventDefault();

      this.mouse.finalX = event.clientX;
      this.mouse.finalY = event.clientY;

      let boxWidth = this._getSize(this.mouse.initialX, this.mouse.finalX, false);
      let boxHeight = this._getSize(this.mouse.initialY, this.mouse.finalY, false);

      if(boxWidth >= boxMinWidth && boxHeight >= boxMinHeight) {
        this.setState({
          boxes: this._updateBoxes({
            x: this._getPosition(this.mouse.initialX, this.mouse.finalX),
            y: this._getPosition(this.mouse.initialY, this.mouse.finalY),
            width: this._toPX(boxWidth),
            height: this._toPX(boxHeight),
            backgroundColor: '#' + Math.round(Math.random() * 16777215).toString(16)
          })
        });
      }
    }
  }

  _getSize = (initial, final, toPX = true) => {
    if(initial <= final) {
      return toPX ? this._toPX(final - initial) : final - initial;
    }
    else {
      return toPX ? this._toPX(initial - final) : initial - final;
    }
  }

  _getPosition = (initial, final, toPX = true) => {
    if(initial <= final) {
      return toPX ? this._toPX(initial) : initial;
    }
    else {
      return toPX ? this._toPX(final) : final;
    }
  }

  _toPX = (value) => {
    return value.toString() + 'px';
  }

  _updateBoxes = (box) => {
    return [...this.state.boxes, box];
  }

  render() {
    return (
      <div
        className="wh100 container"
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}>
        {this.state.boxes.map((props, index) => {
          return (
            <BoxEditor
              key={index}
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height}
              backgroundColor={props.backgroundColor}
            />
          );
        })}
      </div>
    );
  }
}