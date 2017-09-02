import React from 'react'
require ('./progress.scss')

let Progress = React.createClass({
  render() {
    return (
      <div id="component-progress">
        <div className="progress" style={{width: `${this.props.progress}%`}}></div> 
      </div>
    )
  }
})

export default Progress 