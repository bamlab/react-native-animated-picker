import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableHighlight,
  DeviceEventEmitter,
  Platform,
} from 'react-native';

const { height, width } = Dimensions.get('window');
// var dismissKeyboard = require('dismissKeyboard'); // Require React Native's utility library.

const styles = StyleSheet.create({
  keyboard: {
    position: 'absolute',
    bottom: 0,
    width,
    backgroundColor: 'white',
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
  closeButtonText: {
    color: '#027afe',
  },
});

const offset = new Animated.Value(height);

export default class CustomKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: null,
    };
  }

  getChildContext() {
    return { keyboard: this };
  }

  componentWillMount() {
    const didOrWill = (Platform.OS === 'ios') ? 'Will' : 'Did';

    DeviceEventEmitter.addListener(`keyboard${didOrWill}Show`, () => {
      this.close();
    });
  }

  componentWillUnmount() {
    this.close();
    this.setState({
      keyboard: null,
    });
  }

  setKeyboard(keyboard) {
    // If there's an existing keyboard, destroy it and replace it with new one
    if (this.state.keyboard) {
      this.setState({
        keyboard: null,
      });
    }
    this.setState({
      keyboard,
    });
  }

  open() {
    // dismissKeyboard();
    Animated.timing(offset, {
      duration: 300,
      toValue: 0,
    }).start(this.props.onOpen);
  }

  close() {
    Animated.timing(offset, {
      duration: 300,
      toValue: height,
    }).start(() => {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.setKeyboard(null);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
        <Animated.View
          style={[
            styles.keyboard,
            { transform: [{ translateY: offset }] },
          ]}
        >
          <View style={styles.closeButtonContainer}>
            <TouchableHighlight
              onPress={() => this.close()}
              underlayColor="transparent"
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>
                {this.props.closeText ? this.props.closeText : 'close'}
              </Text>
            </TouchableHighlight>
          </View>
          {
            this.state.keyboard
          }
        </Animated.View>
      </View>
    );
  }
}

CustomKeyboard.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  closeText: PropTypes.string,
  children: PropTypes.element.isRequired,
};

CustomKeyboard.childContextTypes = {
  keyboard: PropTypes.any,
};
