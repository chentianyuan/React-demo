import React from 'react'
import Header from './components/header'
import Progress from './components/progress'
import Player from './page/player'
import MusicList from './page/musiclist'
import idList from './components/idlist'

import { Router , IndexRoute , Link , Route , hashHistory } from 'react-router'
import { MUSIC_LIST } from './config/musiclist'

class App extends React.Component{
	constructor(){
		super()
		//在使用React.createClass时在getInitialState中返回初始的State
		//使用ES6继承的语法中，则直接在constructor中设置子组件所有的状态
		this.state = {
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0]
		}
	}
	componentDidMount(){
		//componentDidMount内可以安全地操作dom
		$('#player').jPlayer({
			//绑定jPlayer播放器,放在根节点的组件并不会被销毁
			ready:function(){
				$(this).jPlayer('setMedia',{
					mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play')
			},
			//支持格式配置
			supplied:'mp3',
			wmode:'window'
		})
	}
	
	componentWillUnMount(){	
	}
	
	render(){
		return(
			<div>
				<Header/>
				{ React.cloneElement(this.props.children,this.state) }
			</div>
		)
	}
}

class Root extends React.Component{
	render(){
		return(
			/*告诉react使用hash模式。App组件属于根页面，Player为初始页面，在IndexRoute下*/
			<Router history={hashHistory}>			
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={MusicList}></Route>
					<Route path="/list/:id" component={idList}></Route>
				</Route>
			</Router>
		)
	}
}

export default Root