import React from 'react'
import Progress from '../components/progress'
require ('./player.scss')

let duration = null
let Player = React.createClass({
	getInitialState() {
		return {		
      progress: '-'
    }
  },
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      }) 
    })
  },
  componentWillMount() {
    $('#player').unbind($.jPlayer.event.timeupdate)
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
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
      </div>
    )
  }
})

export default Player