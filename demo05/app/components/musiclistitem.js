import React from 'react'
import './musiclistitem.less'
import {Link} from 'react-router'

class MusicListItem extends React.Component{
	render(){
		let musicItem = this.props.musicItem
		//console.log(this.props.focus)
		return( 
			<li className={`components-listitem row ${this.props.focus?'focus':''}`}>
				<p><span className="bold">{musicItem.title}</span> - {musicItem.artist} - <Link to={`/list/${musicItem.id}`}>看看我的id吧</Link></p>
				<p className="-col-auto delete"></p>
			</li>
		)
	}
}


export default MusicListItem