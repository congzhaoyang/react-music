import React from 'react';
require('./listitem.scss');
import Pubsub from 'pubsub.js'
let PubSub = require('pubsub.js');

let ListItem = React.createClass({
	playMusic(item, e) {
		PubSub.publish('PLAY_MUSIC', item);
	},
    render() {
    	let item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, item)}>
                <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
            </li>
        );
    }
});

export default ListItem;
