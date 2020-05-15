import React, {Component} from 'react';
import { connect } from 'react-redux';

class Login extends Component {
    render(){
        return(
            <div>
                <p>Login Page</p>
                <button>Go to Register</button>
                <button>Go to Dashboard</button>
            </div>
        )
    }
}

const reduxState = (state) => ({
    propsPopup: state.popup
})

export default connect(reduxState, null)(Login);