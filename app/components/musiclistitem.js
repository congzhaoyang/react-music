import React from 'react'
import './musiclistitem'
import Pubsub from 'pubsub.js'

let MusicListItem = React.createClass({
  playMusic(musicItem) {
    Pubsub.publish('PLAY_MUSIC', musicItem)
  },
  render() {
    let musicItem = this.props.musicItem
    return (
      <li onClick={this.playMusic.bind(this, musicItem)}><p>{ musicItem.title } - { musicItem.artist }</p></li> 
    )
  }
})