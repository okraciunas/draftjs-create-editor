import React from 'react';
import BoxEditor from './BoxEditor'

const boxRef = 'editor_';

export default class Editors extends React.Component {
  _onFinish = (index) => {
    this.editors()[index].blur();

    setTimeout(() => {
      this.editors()[index > (this.editors().length - 1) ? 0 : index + 1].focus();
    }, 500);
  }

  editors = () => {
    return Object.keys(this.refs).map(ref => this.refs[ref]);
  }

  render() {
    return (
      <div>
        {this.props.editors.map((props, index) => {
          return (
            <BoxEditor
              ref={`${boxRef}${index}`}
              key={index}
              index={index}
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height}
              backgroundColor={props.backgroundColor}
              content={props.content}
              onFinish={this._onFinish}
            />
          );
        })}
      </div>
    )
  }
}