import firebase from '../firebase_config'

// sebuah function dalam function
export const aksiUserNama = () => (dispatch) => {
    setTimeout(() => {
        return dispatch ({type: 'CHANGE_NAMA', value: 'Power Ranger'})
    }, 2000)
}

export const registerUntukAPI = (data) => (dispatch) => {
    // melakukan dispatch
    dispatch({type: 'CHANGE_LOADING', value: true})
    return(
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
            console.log('success: ', res);
            dispatch({type: 'CHANGE_LOADING', value: false})
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

        })
        
    )

} 
