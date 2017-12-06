import React from 'react'
import {render} from 'react-dom'
import Root from './root'
import {AppContainer} from 'react-hot-loader'

render(
	<AppContainer>
		<Root></Root>
	</AppContainer>
	,
	document.getElementById('root')
)

if(module.hot){
	module.hot.accept('./root',()=>{
		const Newroot = require('./root').default
		render(
			<AppContainer>
				<Root/>
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
