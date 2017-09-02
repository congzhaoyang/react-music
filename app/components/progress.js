import React from 'react'
require ('./progress.scss')

let Progress = React.createClass({
  render() {
    return (
      <div id="component-progress">
        { this.props.progress }s
      </div>
    )
  }
})

export default Progress 