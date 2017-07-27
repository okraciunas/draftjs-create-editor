import React, { Component } from 'react';
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
    event.preventDefault();

    this.mouse.initialX = event.clientX;
    this.mouse.initialY = event.clientY;
  }

  _onMouseUp = (event) => {
    event.preventDefault();

    this.mouse.finalX = event.clientX;
    this.mouse.finalY = event.clientY;

    let boxWidth = this._getSize(this.mouse.initialX, this.mouse.finalX, false);
    let boxHeight = this._getSize(this.mouse.initialY, this.mouse.finalY, false);

    if(boxWidth >= boxMinWidth || boxHeight >= boxMinHeight) {
      this.setState({
        boxes: this._updateBoxes(new Box({
          key: this.state.boxes.length,
          x: this._getPosition(this.mouse.initialX, this.mouse.finalX),
          y: this._getPosition(this.mouse.initialY, this.mouse.finalY),
          width: this._toPX(boxWidth),
          height: this._toPX(boxHeight)
        }))
      });
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

  _createBoxes = () => {
    return this.state.boxes.map(box => box);
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
        {this._createBoxes()}
      </div>
    );
  }
}

const Box = (props) => {
  let style = {
    top: props.y,
    left: props.x,
    width: props.width,
    height: props.height
  }

  return (
    <div
      className="box"
      style={style}
      key={props.key}>
    </div>
  );
}