import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = { 
      isMouseDown: false,
      initialX: 0,
      initialY: 0,
      boxes: []
    };
  }

  _onMouseDown = (event) => {
    event.preventDefault();

    this.setState({
      isMouseDown: true,
      initialX: event.clientX,
      initialY: event.clientY,
    });
  }

  _onMouseUp = (event) => {
    event.preventDefault();

    let props = {
      x: this.state.initialX.toString() + 'px',
      y: this.state.initialY.toString() + 'px',
      width: (event.clientX - this.state.initialX).toString() + 'px',
      height: (event.clientY - this.state.initialY).toString() + 'px'
    }
    let box = new Box(props);

    this.setState({
      isMouseDown: false,
      initialX: 0,
      initialY: 0,
      finalX: 0,
      finalY: 0,
      boxes: this._updateBoxes(box)
    });
  }

  _updateBoxes = (box) => {
    return [
      ...this.state.boxes,
      box
    ];
  }

  _createBoxes = () => {
    let boxes = [];

    for(let i = 0; i < this.state.boxes.length; i++) {
      boxes.push(this.state.boxes[i]);
    }

    return boxes;
  }

  render() {
    if(this.state.isMouseDown) {
      return (
        <div
          className="wh100 container"
          onMouseUp={this._onMouseUp}>
        </div>
      );
    }

    return (
      <div
        className="wh100 container"
        onMouseDown={this._onMouseDown}>
        {this._createBoxes()}
      </div>
    );
  }
}

const Box = (props) => {
  console.log(props);

  let style = {
    position: 'absolute',
    border: '1px solid black',
    top: props.y,
    left: props.x,
    width: props.width,
    height: props.height
  }

  return <div style={style}></div>;
}