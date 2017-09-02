import React from 'react';
import Button from './components/button';
import Header from './components/header'
import Progress from './components/progress'

let Root = React.createClass({
	getInitialState() {
		return {		
			count: 0
		}
	},
	counterHandler() {
		console.log('hello');
		this.setState({
			count: this.state.count + 1
		});
	},
    render() {
        return (
            <div>
              <Header/>
              <Progress progress="1"/>
            </div>
        );
    }
});

export default Root;