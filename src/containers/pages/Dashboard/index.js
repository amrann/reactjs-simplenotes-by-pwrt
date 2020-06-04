import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { tambahDataAPI, panggilDataDariFirebase } from '../../../config/redux/action';
import './Dashboard.scss'

class Dashboard extends Component {
    state = {
        judul: '',
        konten: '',
        tanggal: ''
    }

    componentDidMount(){
        const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'))
        this.props.getNotes(dataPengguna.uid);
    }
    
    // method yang akan menghendel tombol simpan ketika di klik
    hendelTombolSimpan = () => {
        //contoh
        // alert('hai')

        const {judul, konten} = this.state;
        const {simpanDataNotes} = this.props
        
        // berfungsi untuk meng-get (dari localstorage) data pengguna yang login
        const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'))
        
        const iniDataDariForm = {
            judul: judul,
            konten: konten,
            tanggal: new Date().getTime(),
            userId: dataPengguna.uid
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
        console.log('notes: ', this.props.notes)
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
                {
                    this.props.notes.length > 0 ? (
                        <Fragment>
                            {
                                this.props.notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id}>
                                            <p className="judul">{note.dataAray.judul}</p>
                                            <p className="tanggal">{note.dataAray.tanggal}</p>
                                            <p className="konten">{note.dataAray.konten}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxxState = (state) => ({
    // userData ini didapat pada redux/reducer.js
    userData: state.nama,
    notes: state.iniNotes
})

const reduxxDispatch = (dispatch) => ({
    simpanDataNotes : (iniDataDariForm) => dispatch(tambahDataAPI(iniDataDariForm)),
    getNotes: (iniDataDariForm) => dispatch(panggilDataDariFirebase(iniDataDariForm))
})

export default connect(reduxxState, reduxxDispatch) (Dashboard);