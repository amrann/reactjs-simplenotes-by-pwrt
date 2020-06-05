import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { tambahDataAPI, panggilDataDariFirebase, editDataDariFirebase, hapusDataDariFirebase} from '../../../config/redux/action';
import './Dashboard.scss'

class Dashboard extends Component {
    state = {
        judul: '',
        konten: '',
        tanggal: '',
        teksButton: 'SIMPAN',
        iniNoteID: ''
    }

    componentDidMount(){
        const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'))
        this.props.getNotes(dataPengguna.uid);
    }
    
    // method yang akan menghendel tombol simpan ketika di klik
    hendelTombolSimpan = () => {
        //contoh
        // alert('hai')

        const {judul, konten, teksButton, iniNoteID} = this.state;
        const {simpanDataNotes, updateNotes} = this.props
        
        // berfungsi untuk meng-get (dari localstorage) data pengguna yang login
        const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'))
        
        const iniDataDariForm = {
            judul: judul,
            konten: konten,
            tanggal: new Date().getTime(),
            // userId dari file action.js pada method editDataDariFirebase
            userId: dataPengguna.uid
        }

        if(teksButton === 'SIMPAN'){
            simpanDataNotes(iniDataDariForm) 
        } else{
            // noteId dari file action.js pada method editDataDariFirebase
            iniDataDariForm.noteId = iniNoteID
            updateNotes(iniDataDariForm)
        }
        // console.log(iniDataDariForm)
    }

    hendelTombolKensel = () => {
        this.setState({
            judul: '',
            konten: '',
            teksButton: 'SIMPAN'
        })
    }

    onInputChange = (e, tipe) => {
        this.setState({
            [tipe] : e.target.value
        })
    }

    editNotes = (cttn) => {
        console.log(cttn)
        this.setState({
            judul: cttn.dataAray.judul,
            konten: cttn.dataAray.konten,
            teksButton: 'EDIT',
            iniNoteID: cttn.id
        })
    }

    hapusNotes = (e, cttn) => {
        e.stopPropagation(); // untuk menyetop click parent-nya
        const dataPengguna = JSON.parse(localStorage.getItem('dataPengguna'))
        const dataDelete = {
            userId: dataPengguna.uid,
            noteId: cttn.id
        }
        // alert('hai')
        this.props.deleteNotes(dataDelete)
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
                    <div className="aksiButton">
                        {
                            this.state.teksButton === 'EDIT' ? (
                                <button className="save-btn cancel" onClick={this.hendelTombolKensel}>CANCEL</button>
                            ) : <div/>
                        }
                        <button className="save-btn" onClick={this.hendelTombolSimpan}>{this.state.teksButton}</button>
                    </div>
                </div>
                <hr/>
                {
                    this.props.notes.length > 0 ? (
                        <Fragment>
                            {
                                this.props.notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => this.editNotes(note)}>
                                            <p className="judul">{note.dataAray.judul}</p>
                                            <p className="tanggal">{note.dataAray.tanggal}</p>
                                            <p className="konten">{note.dataAray.konten}</p>
                                            <div className="btn-hapus" onClick={(elemen) => this.hapusNotes(elemen, note)}>X</div>
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
    getNotes: (iniDataDariForm) => dispatch(panggilDataDariFirebase(iniDataDariForm)),
    updateNotes: (iniDataDariForm) => dispatch(editDataDariFirebase(iniDataDariForm)),
    deleteNotes: (data) => dispatch(hapusDataDariFirebase(data))
})

export default connect(reduxxState, reduxxDispatch) (Dashboard);