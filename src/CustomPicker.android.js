import React, { Component, PropTypes } from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
  },
});

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
  }

  render() {
    var { onSelect, items, formatItems, title } = this.props;
    // The picker takes items in the form { value : label },
    // so you might need to format them.
    items = formatItems ? formatItems(items) : items;

    return (
      <View style={this.props.viewStyle}>
        <Text >
          {this.state.value ? items[this.state.value] : title}
        </Text>
        <Picker
          style={styles.picker}
          ref="picker"
          selectedValue={this.state.value}
          enabled={this.props.enabled}
          onValueChange={(item) => {
            this.setState({
              value: item,
              valueLabel: items[item],
            });
            onSelect(item);
          }}
        >
          {
            Object.keys(items).map((item) =>
              <Picker.Item
                key={item}
                label={items[item]}
                value={item}
              />
          )
        }
        </Picker>
      </View>
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
  title: PropTypes.string,
  initialValue: PropTypes.any,
  enabled: PropTypes.bool,
  viewStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
};
