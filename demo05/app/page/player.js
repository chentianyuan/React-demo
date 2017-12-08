import React from 'react'
import Progress from '../components/progress'
import './player.less'
import {Link} from 'react-router'

let duration = null
class Player extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			progress:0,
			volume:0,
			isPlay:true
		}
	}
	
	progressChangeHandler(progress){
		//console.log(progress)
		//传入点击事件发生后要开始播放的时间
		$("#player").jPlayer('play',duration * progress)
	}
	
	changeVolumeHandler(progress){
		$("#player").jPlayer('volume',progress)
	}
	
	play(){
		this.state.isPlay ? $('#player').jPlayer('pause') : $('#player').jPlayer('play')
		this.setState({
			isPlay:!this.state.isPlay
		})
	}
	
	componentDidMount(){
		//对播放时间的监听，不断触发this.setState，进而触发render 
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			duration = e.jPlayer.status.duration
			this.setState({
				volume:e.jPlayer.options.volume * 100,
				progress:e.jPlayer.status.currentPercentAbsolute
			})
		})
	}
	
	componentWillUnMount(){
		//防止页面刷新后不会重复绑定
		$("#jPlayer").unbind($.jPlayer.event.timeupdate)
	}
		
	render(){
		return(
			<div className="player-page">
			 <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
			 <div className="mt20 row">
            	<div className="controll-wrapper">
	            	<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
	            	<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
	        		<div className="row mt20">
	        			<div className="left-time -col-auto">-{this.state.leftTime}</div>
        				<div className="volume-container">
        					<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
	        				<div className="volume-wrapper">
				            	<Progress 
									progress={this.state.volume}
									onVolumeHandlerChange={(progress)=>{this.changeVolumeHandler(progress)}}
								></Progress>
							</div>	
						</div>
					</div>
					<div style={{height:10,lineHeight:'10px',marginTop:'10px'}}>
						<Progress
							progress={this.state.progress}
							onProgressChange={(progress)=>{this.progressChangeHandler(progress)}}									
						>
						</Progress>
					</div>
					<div className="mt35 row">
						<div>
							<i className="icon prev"></i>
							<i className={`icon ml20 ${this.state.isPlay?'pause':'play'}`} onClick={()=>{this.play()}}></i>
							<i className="icon next ml20"></i>
						</div>
						<div>
							<i className="icon repeat-cycle"></i>
						</div>
					</div>
				</div>
						<div className="-col-auto cover">
							<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
						</div>
					</div>
	            </div>
		)
	}
	
}

export default Player