import React from 'react'
//路由通过params传参
class idList extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		console.log(this.props.params.id)
		return(
			<div>
				我的id是{this.props.params.id}
			</div>
		)
	}
}

export default idList