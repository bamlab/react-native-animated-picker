import React, { Component, PropTypes } from 'react';
import { Picker, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  container: {
    padding: 10,
  },
});


export default class PickerKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.state.value}
          onValueChange={(item) => {
            this.setState({
              value: item,
            });
            this.props.onSelect(item);
          }}
        >
          {
            Object.keys(this.props.items).map(
              (item) =>
                <Picker.Item
                  key={item}
                  label={this.props.items[item]}
                  value={item}
                />)
          }
        </Picker>
      </View>
    );
  }
}

PickerKeyboard.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onSelect: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rawText: PropTypes.bool,
};
