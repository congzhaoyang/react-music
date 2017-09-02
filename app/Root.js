import React from 'react';
import Button from './components/button';
import Header from './components/header'
import Progress from './components/progress'

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
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      }) 
    })
  },
  render() {
    return (
        <div>
          <Header/>
          <Progress progress={this.state.progress}/>
        </div>
    );
  }
});

export default Root;