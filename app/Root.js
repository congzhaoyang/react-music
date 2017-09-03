import React from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/music_list'
import { Router, IndexRoute, Link, Route, hashHistory} from 'react-router'
import Pubsub from 'pubsub.js'

let App = React.createClass({
  getInitialState() {
		return {		
      currentMusicItem: MUSIC_LIST[0],
      musicList: MUSIC_LIST
    }
  },
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play')

    this.setState({
      currentMusicItem: musicItem
    })
  },
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    })
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })
  },
  componentWillMount() {
    //Pubsub.unsubscribe('PLAY_MUSIC')
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
  },
  render() {
    return (
      <div>
        <Header/>
        { React.cloneElement(this.props.children, this.state) }
      </div>
    );
  }
})

let Root = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player}></IndexRoute>
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    )
  }
});

export default Root;