import React from 'react';
import BoxEditor from './BoxEditor';
import './App.css';

const boxMinWidth = 10;
const boxMinHeight = 10;
const boxRef = 'editor_';

export default class App extends React.Component {
  constructor() {
    super();

    let editors = [];

    if(localStorage.getItem('editors')) {
      editors = [...JSON.parse(localStorage.getItem('editors'))];
    }

    this.mouse = { };
    this.state = { editors: editors };
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

      let boxWidth = this._getSize(this.mouse.initialX, this.mouse.finalX, false);
      let boxHeight = this._getSize(this.mouse.initialY, this.mouse.finalY, false);

      if(boxWidth >= boxMinWidth && boxHeight >= boxMinHeight) {
        this.setState({
          editors: this._updateEditors({
            x: this._getPosition(this.mouse.initialX, this.mouse.finalX),
            y: this._getPosition(this.mouse.initialY, this.mouse.finalY),
            width: this._toPX(boxWidth),
            height: this._toPX(boxHeight),
            backgroundColor: '#' + Math.round(Math.random() * 16777215).toString(16)
          })
        });
      }

      this.mouse.isDown = false;
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

  _updateEditors = (editor) => {
    return [...this.state.editors, editor];
  }

  _save = () => {
    let editors = Object.keys(this.refs)
          .filter(ref => ref.indexOf(boxRef) >= 0)
          .map(ref => this.refs[ref]);

    this.state.editors.forEach((props, index) => {
      props.content = editors[index].content();
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
        <div>
          {this.state.editors.map((props, index) => {
            return (
              <BoxEditor
                key={index}
                ref={`${boxRef}${index}`}
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                backgroundColor={props.backgroundColor}
                content={props.content}
              />
            );
          })}
        </div>
      </div>
    );
  }
}