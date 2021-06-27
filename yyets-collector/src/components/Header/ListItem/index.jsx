import React, { Component } from 'react'

export default class ListItem extends Component {
  render() {
    const { children } = this.props
    return (
      <li className="pt-2 pb-2 text-indigo-50 md:inline-block md:ml-2 md:mr-2 cursor-pointer">
        {children}
      </li>
    )
  }
}
