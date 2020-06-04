import React, {Component} from 'react';
import { connect } from 'react-redux';
import { aksiUserNama } from '../../../config/redux/action';
import Button from '../../../component/atoms/buttons';
import { loginUntukAPI } from '../../../config/redux/action';
import { withRouter } from "react-router-dom";


class Login extends Component {
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

    hendelLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props; // history merupakan bawaan react-router-dom
        console.log('data before send: ', email, password)

        const r = await this.props.loginAPI({email, password}).catch(err => err); // data dikirim ke redux-thunk yg telah dibuat
        if (r){
            console.log('login berhasil hendelLoginSubmit', r)
            // berfungsi untuk menyimpan data user ke storage local (bisa di cek pada inspect element kemudian application) saat login, sehingga ketika terjadi refresh, username tidak terhapus
            localStorage.setItem('dataPengguna', JSON.stringify(r)) 
            
            this.setState({
                email: '',
                password: ''
            })
            history.push('/dashboard')
        }else{
            console.log('login gagal')
        }

    }
    
    changeUser = () => {
        this.props.ubahNamaUser()
    }

    render(){
        return(
            // <div>
            //     <p>Login Page {this.props.namaUser}</p>
            //     <button onClick={this.changeUser}>Ubah Nama User</button>
            //     <button>Go to Dashboard</button>
            // </div>
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.hendelChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.hendelChangeText} value={this.state.password}/>
                    <Button onClick={this.hendelLoginSubmit} namaButton="Login doloe" loading={this.props.isLoading}/>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

// const reduxState = (state) => ({
//     propsPopup: state.popup,
//     namaUser: state.nama
// })

// const reduxDispatch = (dispatch) => ({
//     ubahNamaUser: () => dispatch(aksiUserNama())
// })

const reduxState = (state) => ({
    // didapat dari redux/reducer.js
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUntukAPI(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(Login));