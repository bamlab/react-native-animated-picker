/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomKeyboard, CustomPicker } from 'react-native-animated-picker';

import pokemonData from 'pokemon-data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const starters = {
  1: pokemonData.getById(1),
  4: pokemonData.getById(4),
  7: pokemonData.getById(7),
};

class example extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: 1,
    };
  }

  render() {
    return (
      <CustomKeyboard>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Animated picker example!
          </Text>
          <Text style={styles.instructions}>
            Choose your starter:
          </Text>
          <CustomPicker
            viewStyle={{
              backgroundColor: 'black',
            }}
            textStyle={{
              color: 'white',
            }}
            initialValue={this.state.pokemon}
            onSelect={(pokemon) => this.setState({ pokemon })}
            items={starters}
            onValueChange={(pokemon) => {
              this.setState({
                pokemon,
              });
            }}
          />
        </View>
      </CustomKeyboard>
    );
  }
}

AppRegistry.registerComponent('example', () => example);
