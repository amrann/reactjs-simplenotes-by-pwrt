import firebase from '../firebase_config'

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
            console.log('success: ', res);
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
            console.log('success: ', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerifikasi: res.user.emailVerified
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_NAMA', value: dataUser})
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
            dispatch({type: 'CHANGE_LOGIN', value: false})
            reject(false)
        })  
    })
} 
