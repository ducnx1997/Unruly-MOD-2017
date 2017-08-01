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
      <TouchableOpacity style={[styles.container, {height: this.props.height, width: this.props.width}]}
      onPress={this._onPressCell}>
        <Text>{this.props.table()[this.props.r][this.props.c]}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
