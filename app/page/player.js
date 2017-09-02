import React from 'react'
import Progress from '../components/progress'

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
      <div>
        <Progress progress={this.state.progress}
        onProgressChange = {this.progressChangeHandler}
        />
      </div>
    )
  }
})

export default Player