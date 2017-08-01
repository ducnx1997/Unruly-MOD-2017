import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Cell from './cell';

export default class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = this._initState(this.props.level, this.props.seed);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.level != this.props.level) 
      this.setState(() => {
        return this._initState(nextProps.level, nextProps.seed);
      })
  }

  _genDisableList = (n, m, seed) => {
    let s = seed
    disableList = [];
    for (let i = 1; i <= m; i++) {
      s = s % (n*n);
      console.log(s);
      r = Math.floor(s / n) + (s % n != 0 ? 1 : 0);
      c = s % n;
      if (c == 0) c = n;
      disableList.push({r, c});
      s = s + seed;
    }
    return disableList;
  }
 
  _genTable = (n, seed) => {
      let table = {}
      for (let i = 0; i <= n; i++) table[i] = {};
      let seedrandom = require('seedrandom');
      //base = 100000003;
      //seed = base;
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++) {
          //console.log(Math.random());
          let rdn = seedrandom(Math.random());
          //console.log(rdn());
          //seed = (seed + base) % 100000007;
          if (rdn() < 0.5) table[i][j] = 'O';
          else table[i][j] = 'X';
      }
      return table;
    }

  _initState = (n, seed) => {
    let table = this._genTable(n, seed);
    let disableList = this._genDisableList(n, n * 2, seed);
    for (let i = 1; i <= n; i++)
      for (let j = 1; j <= n; j++) {
        let disable = false;
        for (let k = 0; k < disableList.length; k++)
          if (disableList[k].r == i && disableList[k].c == j) {
            disable = true;
            break;
          }
        if (!disable) table[i][j] = '';
      }
    return {table, disableList}
  }

  _getTable = () => {
   
    return this.state.table;
  }

  _onPressCell(r, c) {
    this.setState(prevState => {
      let newTable = Object.create(prevState.table);
      if (newTable[r][c] == 'O') newTable[r][c] = 'X';
      else if (newTable[r][c] == 'X') newTable[r][c] = '';
      else newTable[r][c] = 'O';
      return {
        table: newTable,
        disableList: prevState.disableList
      }
    })
  }

  _getDisable = (r, c) => { 
    for (let i = 0; i < this.state.disableList.length; i++) {
      if (this.state.disableList[i].r == r && this.state.disableList[i].c == c) {
        return true;
      }
    }
    return false;
  }

  _getColor = (r, c) => {
    let cnt = new Array(0, 0, 0, 0);

    for (let i = 1; i <= this.props.level; i++){
   
      if (this.state.table[r][i] == 'X') cnt[0]++;
      if (this.state.table[r][i] == 'O') cnt[1]++;
      if (this.state.table[i][c] == 'X') cnt[2]++;
      if (this.state.table[i][c] == 'O') cnt[3]++;
    }
    for (let i = 0; i < 4; i++) 
      if (cnt[i] > this.props.level / 2) return 'red';
    let n = this.props.level;
    if (this.state.table[r][c] == '') return 'greenyellow';
    if (r < n && r > 1 && this.state.table[r - 1][c] == this.state.table[r][c] && this.state.table[r][c] == this.state.table[r+1][c]) return 'red';
    if (r < n - 1 && this.state.table[r][c] == this.state.table[r + 1][c] && this.state.table[r + 1][c] == this.state.table[r + 2][c]) return 'red';
    if (r > 2 && this.state.table[r - 2][c] == this.state.table[r - 1][c] && this.state.table[r - 1][c] == this.state.table[r][c]) return 'red';
    if (c < n && c > 1 && this.state.table[r][c - 1] == this.state.table[r][c] && this.state.table[r][c] == this.state.table[r][c + 1]) return 'red';
    if (c < n - 1 && this.state.table[r][c] == this.state.table[r][c + 1] && this.state.table[r][c + 1] == this.state.table[r][c + 2]) return 'red';
    if (c > 2 && this.state.table[r][c - 2] == this.state.table[r][c - 1] && this.state.table[r][c - 1] == this.state.table[r][c]) return 'red';
    return 'greenyellow';
  }

  _createRow = (r) => {
    row = []
    let {height, width} = Dimensions.get('window');
    for (let i = 1; i <= this.props.level; i++) {
      let disable = this._getDisable(r, i);
      let color = this._getColor(r, i);
      row.push(<Cell key={i} r={r} c={i} color={color}
      onPressCell={this._onPressCell.bind(this)} disable={disable}
      number={this.state.table[r][i]} level={this.props.level} 
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
    //console.log(this.state.disableList);
    console.log('rerender');
    //console.log(this.state.disableList);
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
