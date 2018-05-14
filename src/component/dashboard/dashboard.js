import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'



@connect(
	state=>state,
	{getMsgList,recvMsg}
)
class Dashboard extends React.Component{
	componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}

	}
	render(){
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/boss',
				text:'Talents',
				icon:'boss',
				title:'Talents',
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'Recruiter',
				icon:'job',
				title:'Recruiter',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'Message',
				icon:'msg',
				title:'Message',
				component:Msg
			},
			{
				path:'/me',
				text:'User',
				icon:'user',
				title:'User Center',
				component:User
			}
		]

		return (
			<div>
				<NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}

}

export default Dashboard