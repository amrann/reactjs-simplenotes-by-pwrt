import React, {Component} from 'react';
import './Register.scss'
import firebase from '../../../config/firebase_config';

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    hendelChangeText = (e) => {
        // console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    hendelRegisterSubmit = () => {
        const {email, password} = this.state;
        console.log('data before send: ', email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log('success: ', res);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // console.log('error code: ', errorCode);
            // console.log('error message: ', errorMessage);
            // ...
        });
    }

    render(){
        return(
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.hendelChangeText}/>
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.hendelChangeText}/>
                    <button className="btn" onClick={this.hendelRegisterSubmit}>Register</button>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

export default Register;