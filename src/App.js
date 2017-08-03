import React, { Component } from 'react';
import './App.css';
import Input from './input//Input';
import Dummy from './dummy';

class App extends Component {
  render() {
    return (
      <div className="App">
			<Input template="+99 (9) 999 99 99">
				<label>Tel number:</label>
			</Input>
			<Input template="AA 999 999 999">
				<Dummy><p>VAT number</p></Dummy>
			</Input>	
      </div>
    );
  }
}

export default App;
