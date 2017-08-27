import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import Board from './board';
import SeedInput from './seed';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 8,
      gameState: 'Ready',
      seed: 1000 + Math.floor(Math.random() * 8999),
      buttonTitle: 'Regenerate',
      gameId: 0
    }
  }

  _changeSeed = (newSeed) => {
    console.log(newSeed);
    newSeed = parseInt(newSeed);
    console.log(newSeed);
    this.setState((prevState) => {
      let newState = {
        level: prevState.level,
        gameState: prevState.gameState,
        buttonTitle: prevState.buttonTitle,
        seed: newSeed,
        gameId: prevState.gameId + 1
      }
      return newState;
    })
  }

  _changeLevel = (itemValue) => {
    console.log("change level to: " + parseInt(itemValue));
    this.setState(prevState => {
      console.log("level changing");
      return {
        seed: prevState.seed,
        buttonTitle: prevState.buttonTitle,
        gameState: prevState.gameState,
        level: parseInt(itemValue),
        gameId: prevState.gameId + 1
      }
    });
    //console.log("level changed");
  }

  _toggleSolution = () => {
    let newGameState = 'Ready';
    if (this.state.gameState == 'Ready') newGameState = 'Solution';
    this.setState(prevState => {
      return {
        gameState: newGameState,
        level: prevState.level,
        seed: prevState.seed,
        buttonTitle: prevState.buttonTitle,
        gameId: prevState.gameId
      }
    })
  }

  _newGame = () => {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.seed =  1000 + Math.floor(Math.random() * 8999);
      newState.gameState= 'Ready';
      newState.gameId++;
      return newState;
    })
    
  }

  render() {
    //console.log(this.state.seed);
    //console.log(this.state);
    return (
      <View style={[styles.container]}>

        

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>Enter seed random: </Text>
          <SeedInput seed={this.state.seed}
          changeSeed={this._changeSeed.bind(this)}
          />
          {/* <TouchableOpacity onPress={this._onPress}>
            <Text>{this.state.buttonTitle}</Text>
          </TouchableOpacity> */}

          <Text>Choose level:</Text>
          <Picker 
            mode='dropdown'
            style={{height:20, width: 20, backgroundColor: 'black'}}
            selectedValue={this.state.level.toString()}
            onValueChange={(itemValue) => this._changeLevel(itemValue)} >
            <Picker.Item label="6x6" value="6" />
            <Picker.Item label="8x8" value="8" />
            <Picker.Item label="10x10" value="10" />
            {/* <Picker.Item label="12x12" value="12" />
            <Picker.Item label="14x14" value="14" /> */}
          </Picker>
        </View>

        <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'flex-start'}}>
          <View style={{height: 50, width: 100}}>
            <TouchableOpacity onPress={this._newGame}>
              <Text>New game</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{height: 50, width: 100}}>
            <TouchableOpacity onPress={this._toggleSolution}>
              <Text>Show solution</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        
        <Board level={this.state.level} gameState={this.state.gameState} seed={this.state.seed} gameId={this.state.gameId}/> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
