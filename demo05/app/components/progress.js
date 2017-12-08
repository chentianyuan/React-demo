import React from 'react'
import './progress.less'

class Progress extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			barColor:'#2f9842'
		}
	}
	changeProgress(e){
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		//console.log(progress)
		//确认存在onProgressChange函数，并执行传入用户点击的需要开始播放的音乐百分比
		this.props.onProgressChange && this.props.onProgressChange(progress)
		this.props.onVolumeHandlerChange && this.props.onVolumeHandlerChange(progress)
	}
	render(){
		return(
			/*外层灰色,内层艳色,模拟进度条效果*/
			/*必要时ref操作dom*/
			/*点击事件使用箭头函数使this指向组件，或者给事件函数绑定this,传递event事件时，应从箭头函数开始就传入event事件，否则传入的则是react自身的event事件而不是浏览器的*/
			<div className="components-progress" ref="progressBar" onClick={(event)=>{this.changeProgress(event)}}>
				<div className="progress" style={{width:`${this.props.progress}%`,background:this.state.barColor}}></div>
			</div>
		)
	}
}

export default Progress