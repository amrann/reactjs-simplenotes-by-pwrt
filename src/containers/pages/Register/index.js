import React, {Component} from 'react';
import './Register.scss'
import Button from '../../../component/atoms/buttons';
import { connect } from 'react-redux';
import { registerUntukAPI } from '../../../config/redux/action';

class Register extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false
    }

    hendelChangeText = (e) => {
        // console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // hendelRegisterSubmit = () => {
    //     const {email, password} = this.state;
    //     console.log('data before send: ', email, password)
    //     // this.setState({
    //     //     isLoading: true
    //     // })
    //     // setTimeout(() => {
    //     //     this.setState({
    //     //         isLoading: false
    //     //     })
    //     // }, 5000)

    //     this.props.registerAPI({email, password}) // data dikirim ke redux-thunk yg telah dibuat
    //     this.setState({
    //         email: '',
    //         password: ''
    //     })
    // }

    hendelRegisterSubmit = async () => {
        const {email, password} = this.state;
        console.log('data before send: ', email, password)
        // this.setState({
        //     isLoading: true
        // })
        // setTimeout(() => {
        //     this.setState({
        //         isLoading: false
        //     })
        // }, 5000)

        const r = await this.props.registerAPI({email, password}).catch(err => err); // data dikirim ke redux-thunk yg telah dibuat
        if (r === true){
            this.setState({
                email: '',
                password: ''
            })
        }
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.hendelChangeText} value={this.state.email}/>
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.hendelChangeText} value={this.state.password}/>
                    {/* <button className="btn" onClick={this.hendelRegisterSubmit}>Register</button> */}
                    <Button onClick={this.hendelRegisterSubmit} namaButton="Register" loading={this.props.isLoading}/>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUntukAPI(data))
})

export default connect(reduxState, reduxDispatch)(Register);