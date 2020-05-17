import React, {Component} from 'react';
import { connect } from 'react-redux';
import { aksiUserNama } from '../../../config/redux/action';

class Login extends Component {
    changeUser = () => {
        this.props.ubahNamaUser()
    }

    render(){
        return(
            <div>
                <p>Login Page {this.props.namaUser}</p>
                <button onClick={this.changeUser}>Ubah Nama User</button>
                <button>Go to Dashboard</button>
            </div>
        )
    }
}

const reduxState = (state) => ({
    propsPopup: state.popup,
    namaUser: state.nama
})



const reduxDispatch = (dispatch) => ({
    ubahNamaUser: () => dispatch(aksiUserNama())
})

export default connect(reduxState, reduxDispatch)(Login);