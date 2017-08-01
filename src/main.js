import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Board from './board';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 4,
      gameState: 'Ready',
      seed: 12345,
      buttonTitle: 'Regenerate'
    }
  }

  _onPress = () => {
    let nextLevel = this.state.level + 2;
    if (nextLevel > 14)  nextLevel = 8;
    this.setState(prevState => {
      return {
        level: nextLevel,
        gameState: 'Ready',
        seed: 12345,
        buttonTitle: 'Regenerate'
      }
    });
    console.log(this.state.level);
  }

  render() {
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
