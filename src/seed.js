import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class SeedInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      seed: this.props.seed.toString()
    }
  }

  _changeSeed = (event) => {
    let value = event.nativeEvent.text;
    //console.log(value);
    this.props.changeSeed(value);
  }

  render() {
    //console.log("seed in input: " + this.state.seed);
    return (
      <TextInput
        style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        value={this.state.seed}
        onChangeText={(value) => this.setState({ seed: value })}
        onSubmitEditing={(event) => this._changeSeed(event)}
      />
    );
  }
}