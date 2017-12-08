import React from 'react'
import MusicListItem from '../components/musiclistitem'

class MusicList extends React.Component{
	constructor(){
		super()	
	}
	render(){
		//console.log(this.props.currentMusicItem)
		let listEle = null
		listEle = this.props.musicList.map((item,index)=>{
			return (
				//item.id作为key可以保证react在重新渲染组件的时候只更新需要更新的dom和数据
				<MusicListItem 
					key={item.id} 
					musicItem={item}
					focus={item===this.props.currentMusicItem}
					>
					{item.title}
				</MusicListItem>
			)
		})
		return(
			<ul>
				{ listEle }
			</ul>
		)
	}
}

export default MusicList