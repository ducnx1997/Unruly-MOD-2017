import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Cell from './cell';

export default class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      table: this._genTable(this.props.level)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level != this.props.level) 
      this.setState(() => {
        return {
          table: this._genTable(nextProps.level)
        }
      })
  }
 
  _genTable = (n) => {
      let table = {}
      for (let i = 0; i <= n; i++) table[i] = {};
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

  _onPressCell(r, c) {
    this.setState(prevState => {
      let newTable = Object.create(prevState.table);
      if (newTable[r][c] === 0) newTable[r][c] = 1;
      else if (newTable[r][c] === 1) newTable[r][c] = '';
      else newTable[r][c] = 0;
      return {
        table: newTable
      }
    })
  }

  _createRow = (r) => {
    row = []
    let {height, width} = Dimensions.get('window');
    for (let i = 1; i <= this.props.level; i++) {
      row.push(<Cell key={i} r={r} c={i} 
      onPressCell={this._onPressCell.bind(this)}
      table={this._getTable.bind(this)} level={this.props.level} 
      height={width/this.props.level} width={width/this.props.level}/>)
    }
    return (
      <View key={r} style={{flexDirection: 'row'}}>{row}</View>
    )
  }

  _createTable = () => {
    let table = []
    for (let i = 1; i <= this.props.level; i++) 
      table.push(this._createRow(i))
    return table;
  }

  render() {
    
    return (
      <View style={[styles.container]}>
        {this._createTable()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
