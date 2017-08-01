import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

  }

  _onPressCell = () => {
    this.props.onPressCell(this.props.r, this.props.c);
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, {height: this.props.height, 
      width: this.props.width, backgroundColor: this.props.color,
      borderWidth: this.props.disable? 5:1}]}
      onPress={this._onPressCell} disabled={this.props.disable}>
        <Text>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
