import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Cell from './cell';

export default class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      table: this._createTable(this.props.level)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.level != this.props.level) return true;
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level != this.props.level) 
      this.setState(() => {
        return {
          table: this._createTable(nextProps.level)
        }
      })
  }

  _createTable = (n) => {
      let table = new Array(n + 1)
      for (let i = 0; i <= n; i++) table[i] = new Array(n + 1);
      let seed = this.props.seed;
      let seedrandom = require('seedrandom');
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++) {
          //console.log(Math.random());
          let rdn = seedrandom(Math.random());
          //console.log(rdn());
          seed = (seed * seed) % 100000007;
          if (rdn() < 0.5) table[i][j] = 0;
          else table[i][j] = 1;
      }
      return table;
    }

  _getTable = () => {
    //console.log(this._table);
    return this.state.table;
  }

  _createRow = (r) => {
    row = []
    let {height, width} = Dimensions.get('window');
    for (let i = 1; i <= this.props.level; i++) {
      //console.log(r); console.log(i);
      row.push(<Cell key={i} r={r} c={i} number={this.state.table[r][i]}
      table={this._getTable.bind(this)}
      level={this.props.level} height={width/this.props.level} width={width/this.props.level}/>)
    }
    return (
      <View key={r} style={{flexDirection: 'row'}}>{row}</View>
    )
  }

  render() {
    //console.log(this.props.level);
    let table = []
    for (let i = 1; i <= this.props.level; i++) 
      table.push(this._createRow(i))
    // console.log(table.length);
    //console.log(this._table)
    let {height, width} = Dimensions.get('window');
    return (
      <View style={[styles.container, {height: (width/this.props.level)*this.props.level, 
      width: (width/this.props.level)*this.props.level}]}>
      {table}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
