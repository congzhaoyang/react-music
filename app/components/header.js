import React from 'react'
require ('./header.scss')

let Header = React.createClass({
  render() {
    return (
      <div id="component-header">
         <h1 class="caption">react music player DEMO</h1>
      </div>
    )
  }
})

export default Header