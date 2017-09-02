import React from 'react'
require ('./progress.scss')

let Progress = React.createClass({
  changeProgress(e) {
    let progressBar = this.refs.progressBar
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
    console.log(progress)
    this.props.onProgressChange && this.props.onProgressChange(progress)
  },
  render() {
    return (
      <div id="component-progress" ref="progressBar" onClick={this.changeProgress}>
        <div className="progress" style={{width: `${this.props.progress}%`}}></div> 
      </div>
    )
  }
})

export default Progress 