import firebase, {databes} from '../firebase_config'

// sebuah function dalam function
export const aksiUserNama = () => (dispatch) => {
    setTimeout(() => {
        return dispatch ({type: 'CHANGE_NAMA', value: 'Power Ranger'})
    }, 2000)
}

export const registerUntukAPI = (data) => (dispatch) => {
    // tanpa menggunakan Promise
    // // melakukan dispatch
    // dispatch({type: 'CHANGE_LOADING', value: true})
    // return(
    //     firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    //     .then(res => {
    //         console.log('success: ', res);
    //         dispatch({type: 'CHANGE_LOADING', value: false})
    //     })
    //     .catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log(errorCode, errorMessage)
    //         // console.log('error code: ', errorCode);
    //         // console.log('error message: ', errorMessage);
    //         // ...
    //         dispatch({type: 'CHANGE_LOADING', value: false})

    //     })
    // )

    return new Promise ((resolve, reject) => {
        // melakukan dispatch
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success registerUntukAPI: ', res);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // console.log('error code: ', errorCode);
            // console.log('error message: ', errorMessage);
            // ...
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(false)
        })
    })
} 


export const loginUntukAPI = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
        // melakukan dispatch
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success loginUntukAPI: ', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerifikasi: res.user.emailVerified,
                refreshToken: res.user.refreshToken
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_NAMA', value: dataUser})
            // resolve(true)
            resolve(dataUser)
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // console.log('error code: ', errorCode);
            // console.log('error message: ', errorMessage);
            // ...
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_LOGIN', value: false})
            reject(false)
        })  
    })
} 

export const tambahDataAPI = (data) => (dispatch) => {
    databes.ref('notes/' + data.userId).push({
        // data2 dibawah ini ada pada index\Dashboard
        judul: data.judul,
        konten: data.konten,
        tanggal: data.tanggal
    })
}

// method ini bertujuan untuk memanggil data yang sudah ada pada firebase
export const panggilDataDariFirebase = (userId) => (dispatch) => {
    const urlNotes = databes.ref('notes/' + userId);
    return new Promise ((resolve, reject) => {
        urlNotes.on('value', function (snapshot) {
            console.log('get Data Firebes : ', snapshot.val())

            //ngelooping data-data yg ada dalam tiap id
            const dataAray = []
            Object.keys(snapshot.val()).map(key => {
                dataAray.push({
                    id: key,
                    dataAray: snapshot.val()[key]
                })
            })
            
            dispatch({type: 'SET_NOTES', value: dataAray})
            resolve(snapshot.val())
        })
    })

}

// method ini bertujuan untuk mengedit data yang sudah ada pada firebase
export const editDataDariFirebase = (data) => (dispatch) => {
    const urlNotes = databes.ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        urlNotes.set({
            judul: data.judul,
            konten: data.konten,
            tanggal: data.tanggal
        }, (err) => {
            if(err) {
                reject (false);
            } else {
                resolve (true)
            }
        })
    })

}
