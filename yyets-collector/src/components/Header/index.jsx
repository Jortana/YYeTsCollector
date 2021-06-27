import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'
import ListItem from './ListItem'

class Header extends Component {
  state = {
    hidden: true, // 隐藏菜单是否显示
    searchHidden: true, // 大屏幕时搜索框是否显示
  }

  // 在小屏幕上切换隐藏菜单的展示
  toggleMenu = () => {
    const { hidden } = this.state
    this.setState({ hidden: !hidden })
  }

  // 在大屏幕上切换搜索栏和导航栏的展示
  toggleSearch = () => {
    const { searchHidden } = this.state
    this.setState({ searchHidden: !searchHidden })
  }

  // 处理搜索栏的输入，如果按下回车就去搜索页
  handelInput = (event) => {
    const {
      code,
      target: { value },
    } = event
    // 如果没有按下回车或者输入框为空则不进行处理
    if (code !== 'Enter' || value === '') {
      return
    }
    this.changePage(`/search/${value}`)()
  }

  /**
   * 切换页面的回调
   * @param {String} to - 跳转到的页面的相对路径
   * @memberof Header
   */
  changePage = (to) => {
    return () => {
      const { history } = this.props
      history.push(to)
    }
  }

  render() {
    const { hidden, searchHidden } = this.state
    return (
      <div className="h-12 bg-blue-700 pl-2 pr-2">
        <div className="h-12 flex items-center justify-between max-w-5xl m-auto">
          <div onClick={this.toggleMenu}>
            <MenuIcon
              className="flex-none h-7 w-7 text-white md:hidden transition-all duration-200 absolute"
              style={{
                opacity: hidden ? '100%' : '0',
              }}
            />
            <XIcon
              className="flex-none h-7 w-7 text-white md:hidden transition-all duration-200"
              style={{
                opacity: hidden ? '0' : '100%',
              }}
            />
          </div>
          {/* logo */}
          <div
            className="rounded-full bg-gray-200 h-7 w-7 overflow-hidden cursor-pointer"
            onClick={this.changePage('/home')}
          >
            <img src="/logo.png" alt="logo" />
          </div>
          {/* 横向的菜单 */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul
              className={`${
                !searchHidden ? '-top-8 opacity-0' : 'top-1'
              } absolute transition-all ease-in-out duration-300`}
            >
              <ListItem>电影</ListItem>
              <ListItem>美剧</ListItem>
              <ListItem>英剧</ListItem>
              <ListItem>日剧</ListItem>
              <ListItem>韩剧</ListItem>
              <li className="inline-block pt-2 pb-2 ml-2 mr-2 text-indigo-50  cursor-pointer">
                <SearchIcon
                  onClick={this.toggleSearch}
                  className="w-5 h-5 inline-block -mt-1"
                />
              </li>
            </ul>
            {/* 大屏幕时的搜索框 */}
            <div
              className={`${
                searchHidden ? 'top-8 opacity-0' : 'top-3'
              } flex absolute transition-all ease-in-out duration-300`}
            >
              <SearchIcon className="w-5 h-5 text-indigo-300 mt-0.5 mr-2" />
              <input
                type="text"
                className="bg-transparent placeholder-blue-300 outline-none text-blue-50 w-80"
                placeholder="搜索片名"
                onKeyPress={this.handelInput}
              />
              <XIcon
                className="w-5 h-5 text-indigo-300 mt-0.5 cursor-pointer"
                onClick={this.toggleSearch}
              />
            </div>
          </div>
          {/* 登录按钮和用户头像 */}
          <div className="h-7 w-10 flex">
            {/* <button type="button" className="text-indigo-50">
              登录
            </button> */}
          </div>
          {/* 隐藏的菜单 */}
          <div
            className="absolute right-0 top-12 overflow-hidden w-screen bg-blue-800 transition-all ease-in-out duration-500"
            style={{
              height: hidden ? 0 : '100vh',
              opacity: hidden ? '80%' : '100%',
            }}
          >
            <ul className="pt-10 pl-10 pr-10 divide-y divide-indigo-300">
              <ListItem>电影</ListItem>
              <ListItem>美剧</ListItem>
              <ListItem>英剧</ListItem>
              <ListItem>日剧</ListItem>
              <ListItem>韩剧</ListItem>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
