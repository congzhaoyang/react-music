import React from 'react';
import Header from './components/header'
import PlayerPage from './page/player'
import ListPage from './page/list'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/config'
import { Router, IndexRoute, Link, Route, hashHistory} from 'react-router'
import Pubsub from 'pubsub.js'

let App = React.createClass({
  getInitialState() {
		return {		
      currentMusicItem: MUSIC_LIST[0],
      musicList: MUSIC_LIST
    }
  },
  playMusic(item) {
    $('#player').jPlayer('setMedia', {
      mp3: item.file
    }).jPlayer('play')
    this.setState({
      currentMusicItem: item
    })
  },
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem);
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		this.setState({
			currentMusitItem: musicItem
		});
		this.playMusic(musicItem);
  },
  findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	},
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    })
    this.playMusic(this.state.currentMusicItem)
    //只要有事件绑定，就一定要解绑
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    })
    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('PREV')
    })
    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext()
    })
  },
  componentWillMount() {
    //事件解绑总是报错
    /*
    Pubsub.unsubscribe('PLAY_MUSIC')
    PubSub.unsubscribe('PLAY_NEXT');
    PubSub.unsubscribe('PLAY_PREV');
    */
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
          <IndexRoute component={PlayerPage}></IndexRoute>
          <Route path="/list" component={ListPage}></Route>
        </Route>
      </Router>
    )
  }
});

export default Root;