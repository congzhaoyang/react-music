import React from 'react';
import Header from './components/header'
import Player from './page/player'

let Root = React.createClass({
  componentDidMount() {
    $('#player').jPlayer({
      ready: function() {
        $(this).jPlayer('setMedia', {
          mp3: 'http://mp3.flash127.com/music/11676.mp3'
        }).jPlayer('play')
      },
      supplied: 'mp3',
      wmode: 'window'
    })
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
  },
  render() {
    return (
      <div>
        <Header/>
        <Player/>
      </div>
    );
  }
});

export default Root;