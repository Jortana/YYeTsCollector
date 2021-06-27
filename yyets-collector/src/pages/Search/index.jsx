import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    const {
      match: {
        params: { keyword },
      },
    } = this.props
    return (
      <div>
        search<div>{keyword}</div>
      </div>
    )
  }
}
