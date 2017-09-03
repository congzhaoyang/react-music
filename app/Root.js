import React from 'react';
import Header from './components/header'
import Player from './page/player'
import { MusicList } from './config/music_list' 

let Root = React.createClass({
  getInitialState() {
		return {		
      currentMusicItem: MusicList[0]
    }
  },
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
        <Player currentMusicItem={this.state.currentMusicItem}/>
      </div>
    );
  }
});

export default Root;