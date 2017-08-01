import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    //console.log(this.props.level);
    return (
      <View style={[styles.container, {height: this.props.width, width: this.props.width}]}>
        <Text>{this.props.table()[this.props.r][this.props.c]}</Text>
      </View>
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
