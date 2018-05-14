import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
@connect(
    state => state.user,
    {login}
)
export default class Login extends React.Component {
    constructor() {
        super()
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.state = {
            user: '',
            pwd: ''
        }

    }

    register() {
        this.props.history.push('/register')
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleLogin() {
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={(v) => this.handleChange('user', v)}>Username</InputItem>
                        <InputItem onChange={(v) => this.handleChange('pwd', v)} type='password'>Password</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.handleLogin}>Log In</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary' onClick={this.register}>Register</Button>
                </WingBlank>
            </div>
        )
    }
}