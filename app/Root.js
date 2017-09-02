import React from 'react';
import Button from './components/button';
import Header from './components/header'
import Progress from './components/progress'

let duration = null
let Root = React.createClass({
	getInitialState() {
		return {		
      progress: '-'
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
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      }) 
    })
  },
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress)
  },
  render() {
    return (
        <div>
          <Header/>
          <Progress progress={this.state.progress}
          onProgressChange = {this.progressChangeHandler}
          />
        </div>
    );
  }
});

export default Root;