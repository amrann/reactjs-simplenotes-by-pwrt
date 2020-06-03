import React, {Component} from 'react';
import { connect } from 'react-redux';
import { tambahDataAPI } from '../../../config/redux/action';
import './Dashboard.scss'

class Dashboard extends Component {
    state = {
        judul: '',
        konten: '',
        tanggal: ''
    }
    
    // method yang akan menghendel tombol simpan ketika di klik
    hendelTombolSimpan = () => {
        //contoh
        // alert('hai')

        const {judul, konten} = this.state;
        const {simpanDataNotes} = this.props
        const iniDataDariForm = {
            judul: judul,
            konten: konten,
            tanggal: new Date().getTime(),
            userId: this.props.userData.uid
        }

        simpanDataNotes(iniDataDariForm) 
        // console.log(iniDataDariForm)
    }

    onInputChange = (e, tipe) => {
        this.setState({
            [tipe] : e.target.value
        })
    }
    
    render(){
        const {judul, konten, tanggal} = this.state;
        return(
            // <div>
            //     <p>Dashboard Page</p>
            //     <button>Go to Register</button>
            //     <button>Go to Dashboard</button>
            // </div>
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={judul} onChange={(e) => this.onInputChange(e, 'judul')}/>
                    <textarea placeholder="content" className="input-content" value={konten} onChange={(e) => this.onInputChange(e, 'konten')}>

                    </textarea>
                    <button className="save-btn" onClick={this.hendelTombolSimpan}>Simpan</button>
                </div>
                <hr/>
                <div className="card-content">
                    <p className="judul">Title</p>
                    <p className="tanggal">18 Mei 2020</p>
                    <p className="konten">Content note</p>
                </div>
            </div>
        )
    }
}

const reduxxState = (state) => ({
    // userData ini didapat pada redux/reducer.js
    userData: state.nama
})

const reduxxDispatch = (dispatch) => ({
    simpanDataNotes : (iniDataDariForm) => dispatch(tambahDataAPI(iniDataDariForm))
})

export default connect(reduxxState, reduxxDispatch) (Dashboard);