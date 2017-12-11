import React from 'react'
import Header from './components/header'
import Progress from './components/progress'
import Player from './page/player'
import MusicList from './page/musiclist'
import idList from './components/idlist'
import Pubsub from 'pubsub-js'

import { Router , IndexRoute , Link , Route , hashHistory } from 'react-router'
import { MUSIC_LIST } from './config/musiclist'

class App extends React.Component{
	constructor(){
		super()
		//在使用React.createClass时在getInitialState中返回初始的State
		//使用ES6继承的语法中，则直接在constructor中设置子组件所有的状态
		this.state = {
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0],
			curType:0		
		}
	}
	playMusic(musicItem){
		//console.log(musicItem)
		$('#player').jPlayer('setMedia',{
			mp3:musicItem.file
		}).jPlayer('play')
		
		this.setState({
			currentMusicItem:musicItem
		})
	}
	playNext(type = "next"){
		let index = this.findMusicIndex(this.state.currentMusicItem)
		let newIndex = null
		let musicListLength = this.state.musicList.length
		if(type = "next"){
			newIndex = (index + 1) % musicListLength
		}else{
			newIndex = (index - 1 + musicListLength) % musicListLength
		}
		//console.log(newIndex)
		
		this.playMusic(this.state.musicList[newIndex])
	}
	
	nativeNext(){
		let curT = this.state.curType
		let index = this.findMusicIndex(this.state.currentMusicItem)	
		if(curT == 0){
			this.playNext()
		}else if(curT == 1){
			this.playMusic(this.state.musicList[index])	
		}else{
			let next = this.getRandom()
			//console.log(next)
			this.playMusic(this.state.musicList[next-1])
		}
	}
	
	getRandom(){
		let musicListLength = this.state.musicList.length
		return Math.ceil(Math.random()*musicListLength)
	}
	
	findMusicIndex(musicItem){
		return this.state.musicList.indexOf(musicItem)
	}
	componentDidMount(){
		//componentDidMount内可以安全地操作dom
		$('#player').jPlayer({
			//支持格式配置
			supplied:'mp3',
			wmode:'window'
		})
		
		//播放
		this.playMusic(this.state.currentMusicItem)
		
		//监听播放结束
		$('#player').bind($.jPlayer.event.ended,(e)=>{
			this.nativeNext()
		})
		
		//订阅pubsub事件
		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
			this.setState({
				musicList:this.state.musicList.filter(item=>{
					return item !== musicItem
				})
			})
		})
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
			this.playMusic(musicItem)
		})
		Pubsub.subscribe('PLAY_PREV',(msg,musicItem)=>{
			this.playNext('prev')
		})
		Pubsub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
			this.playNext()
		})
		Pubsub.subscribe('PLAY_CYCLE',(msg,musicItem)=>{
			this.setState({
				curType:0
			})
		})
		Pubsub.subscribe('PLAY_ONCE',(msg,musicItem)=>{
			this.setState({
				curType:1
			})
		})
		Pubsub.subscribe('PLAY_RANDOM',(msg,musicItem)=>{
			this.setState({
				curType:2
			})
		})
	}
	
	componentWillUnMount(){
		//解除订阅
		Pubsub.unsubscribe('PLAY_MUSIC')
		Pubsub.unsubscribe('PLAY_PREV')
		Pubsub.unsubscribe('PLAY_NEXT')
		Pubsub.unsubscribe('DELETE_MUSIC')
		$('#player').unbind($.jPlayer.event.ended)
	}
	
	render(){
		return(
			<div>
				<Header/>
			{/*这里要替换成对应url规则下的组件，用this.props.children获取匹配到的子组件，获取到子组件后，为了传值，调用React的cloneElement函数*/}
				{ React.cloneElement(this.props.children,this.state) }
			</div>
		)
	}
}

class Root extends React.Component{
	render(){
		return(
			/*告诉react使用hashHistory的url模式。App组件属于根页面，Player为初始页面，在IndexRoute下*/
			<Router history={hashHistory}>			
				<Route path="/" component={App}>
					/*在Route内部属于嵌套的页面，route内不能传参*/
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={MusicList}></Route>
					<Route path="/list/:id" component={idList}></Route>
				</Route>
			</Router>
		)
	}
}

export default Root