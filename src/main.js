import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Board from './board';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 8,
      gameState: 'Ready',
      seed: 123456789,
      buttonTitle: 'Regenerate'
    }
  }

  _onPress = () => {
    let nextLevel = this.state.level + 2;
    if (nextLevel > 10)  nextLevel = 4;
    this.setState(prevState => {
      return {
        level: nextLevel,
        gameState: 'Ready',
        seed: 123456789,
        buttonTitle: 'Regenerate'
      }
    });
  }

  render() {
    console.log(this.state.level);
    return (
      <View style={styles.container}>
         <Board level={this.state.level} gameState={this.state.gameState} seed={this.state.seed}/> 
        <TouchableOpacity onPress={this._onPress}>
          <Text>{this.state.buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
