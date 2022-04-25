//@ts-nocheck
import React, { Component } from 'react';
import { withPiniadux } from 'piniadux';
class Demo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.piniadux.state.user.name}</div>;
  }
}
export default withPiniadux('storeName', Demo, {
  state() {
    return {
      user: {
        name: 'xiaoming',
      },
    };
  },
});
