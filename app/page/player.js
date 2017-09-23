import React from 'react'
import Progress from '../components/progress'
require ('./player.scss')
import { Link } from 'react-router'
import Pubsub from 'pubsub.js'

let duration = null
let Player = React.createClass({
	getInitialState() {
		return {		
      progress: '-',
      isPlay: true,
      leftTime: ''
    }
  },
  playNext() {
    Pubsub.publish('PLAY_NEXT')
  },
  playPrev() {
    Pubsub.publish('PLAY_PREV')
  },
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      }) 
    })
  },
  componentWillMount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
  },
  play() {
    if(this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  },
  formatTime(time) {
    time = Math.floor(time)
    var minute = Math.floor(time / 60)
    var seconds = Math.floor(time % 60)
    return `${(minute < 10 ? '0' + minute : minute)}:${(seconds < 10 ? '0' + seconds : seconds)}` //ES6模板字符串 + 三元运算符
  },
  render() {
    return (
      <div id="player-page">
        <Progress progress={this.state.progress}
        onProgressChange = {this.progressChangeHandler}
        />
        <h2>{this.props.currentMusicItem.title}</h2>
        <h3>{this.props.currentMusicItem.artist}</h3>
        <img src={this.props.currentMusicItem.cover}/>
        <p>{this.state.leftTime}</p>
        <button onClick={this.play}>{`${this.state.isPlay ? '播放':'暂停'}`}</button>
        <button onClick={this.playNext}>下一曲</button>
        <button onClick={this.playPrev}>上一曲</button>
        <h2><Link to="/list">我的歌单</Link></h2>
      </div>
    )
  }
})

export default Player