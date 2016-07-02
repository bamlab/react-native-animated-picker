import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import PickerKeyboard from './PickerKeyboard';

import _ from 'lodash';

export default class CustomPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.initialValue,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.initialValue) {
      this.setState({ value: newProps.initialValue });
    }
  }

  componentWillUnmount() {
    this.context.keyboard.setKeyboard(null);
    this.context.keyboard.close();
  }

  updateValue(item) {
    this.setState({
      value: item,
    });
    this.props.onSelect(item);
  }

  render() {
    var { items, title } = this.props;
    // The picker takes items in the form { value : label },
    // so you might need to format them.
    if (this.props.formatItems) {
      items = this.props.formatItems(items);
    }

    return (
      <TouchableOpacity
        style={this.props.viewStyle}
        onPress={
          () => {
            if (!this.props.enabled || _.isEmpty(items)) return;
            if (this.state.value === null || this.state.value === undefined) {
              this.updateValue(Object.keys(items)[0]);
            }
            this.context.keyboard.setKeyboard(
              <PickerKeyboard
                items={items}
                onSelect={(item) => this.updateValue(item)}
                value={this.state.value}
              />
            );
            this.context.keyboard.open();
          }
        }
      >
        <Text style={this.props.textStyle}>
          {this.state.value ? items[this.state.value] : title}
        </Text>
      </TouchableOpacity>
    );
  }
}

CustomPicker.defaultProps = {
  enabled: true,
};

CustomPicker.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onSelect: PropTypes.func,
  formatItems: PropTypes.func,
  initialValue: PropTypes.any,
  title: PropTypes.string,
  enabled: PropTypes.bool,
  viewStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
};

CustomPicker.contextTypes = {
  keyboard: PropTypes.any, //TODO: Replace with PropTypes.shape
};
