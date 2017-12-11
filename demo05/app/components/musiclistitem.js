import React from 'react'
import './musiclistitem.less'
import Pubsub from 'pubsub-js'
import {Link} from 'react-router'

class MusicListItem extends React.Component{
	playMusic(musicItem){
		Pubsub.publish('PLAY_MUSIC',musicItem)
	}
	deleteMusic(musicItem,e){
		e.stopPropagation()
		Pubsub.publish('DELETE_MUSIC',musicItem)	
	}
	render(){
		let musicItem = this.props.musicItem
		//console.log(this.props.focus)
		return( 
			<li onClick={this.playMusic.bind(this,musicItem)} className={`components-listitem row ${this.props.focus?'focus':''}`}>
				<p><span className="bold">{musicItem.title}</span> - {musicItem.artist} - <Link to={`/list/${musicItem.id}`}>看看我的id吧</Link></p>
				<p onClick={this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
			</li>
		)
	}
}


export default MusicListItem